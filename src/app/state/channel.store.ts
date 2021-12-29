import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {
    CHANNEL_SET_USER_AGENT,
    EPG_GET_PROGRAM,
} from '../../../shared/ipc-commands';
import { Channel } from './channel.model';
import * as moment from 'moment';
import { EpgProgram } from '../player/models/epg-program.model';
import { DataService } from '../services/data.service';

export interface ChannelState extends EntityState<Channel> {
    active: Channel;
    epgAvailable: boolean;
    currentEpgProgram: EpgProgram;
    favorites: string[];
    playlistId: string;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'channel', resettable: true })
export class ChannelStore extends EntityStore<ChannelState> {
    /**
     * Creates an instance of ChannelStore
     * @param electronService electron service
     */
    constructor(private electronService: DataService) {
        super({
            active: undefined,
            currentEpgProgram: undefined,
            epgAvailable: false,
            favorites: [],
            playlistId: '',
        });
    }

    /**
     * Adds/removes the given channel from the favorites list
     * @param channel channel to add/remove
     */
    updateFavorite(channel: Channel): void {
        let favorites;
        this.update((store) => {
            if (store.favorites.includes(channel.id)) {
                favorites = [
                    ...store.favorites.filter((id) => id !== channel.id),
                ];
            } else {
                favorites = [...store.favorites, channel.id];
            }
            this.electronService.sendIpcEvent('update-favorites', {
                id: store.playlistId,
                favorites,
            });
            return { favorites };
        });
    }

    /**
     * Updates selected/active channel in store
     * @param channel selected channel
     */
    setActiveChannel(channel: Channel): void {
        this.update((store) => {
            if (store.epgAvailable) {
                this.electronService.sendIpcEvent(EPG_GET_PROGRAM, {
                    channelName: channel.name,
                });
                if (channel.http['user-agent']) {
                    this.electronService.sendIpcEvent(CHANNEL_SET_USER_AGENT, {
                        referer: channel.http.referrer,
                        userAgent: channel.http['user-agent'],
                    });
                }
            }
            return {
                ...store,
                active: { ...channel, epgParams: '' },
            };
        });
    }

    /**
     * Sets the given timestamp for the epg program
     * @param program epg program to set as active
     */
    setActiveEpgProgram(program: EpgProgram): void {
        const from = moment(
            program['_attributes'].start,
            'YYYYMMDDHHmm ZZ'
        ).unix();
        const now = moment(Date.now()).unix();
        const epgParams = `?utc=${from}&lutc=${now}`;
        this.update((store) => ({
            ...store,
            active: { ...store.active, epgParams },
        }));
    }

    /**
     * Sets the active channel from epg program back to the live translation
     */
    resetActiveEpgProgram(): void {
        this.update((store) => ({
            ...store,
            active: { ...store.active, epgParams: '' },
        }));
    }

    /**
     * Updates the epg availability flag
     * @param value
     */
    setEpgAvailableFlag(value: boolean): void {
        this.update((store) => {
            if (store.active && store.active.name) {
                this.electronService.sendIpcEvent(EPG_GET_PROGRAM, {
                    channelName: store.active.name,
                });
            }

            return {
                ...store,
                epgAvailable: value,
            };
        });
    }

    /**
     * Updates the active epg program for the active channel
     * @param currentEpgProgram program to set
     */
    setCurrentEpgProgram(currentEpgProgram: EpgProgram): void {
        this.update((store) => ({
            ...store,
            currentEpgProgram,
        }));
    }
}
