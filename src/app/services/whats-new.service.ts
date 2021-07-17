import { ModalWindow } from 'ngx-whats-new/lib/modal-window.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class WhatsNewService {
    /** Visibility state of the modal */
    dialogState$ = new BehaviorSubject<boolean>(false);

    /** Array with all available modals */
    modals = {
        '0.6.0': [
            {
                imageHeight: 470,
                imageBgColor: '#333',
                imageSrc: './assets/updates/060/dark-theme.png',
                title: 'New in v0.6.0 - Dark theme 🎉',
                text: 'Finally, the dark theme is now available. Check the settings page of the application to change the theme.',
                button: {
                    text: 'OKAY',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                imageHeight: 470,
                imageBgColor: '#333',
                imageSrc: './assets/updates/060/channel-logos.png',
                title: 'Channel logos 📺',
                text: 'The channel list was extended with the visualization of logotypes (only visible if they are defined in the playlist)',
                button: {
                    text: 'OKAY',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                imageHeight: 470,
                imageBgColor: '#333',
                imageSrc: './assets/updates/060/custom-user-agent.png',
                title: 'Custom user agent 🕵️‍♂️',
                text: 'Some IPTV providers need a specific user-agent in order to play their playlist. Support of custom user agent is available now.',
                button: {
                    text: 'GOT IT',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
        ],
        '0.7.0': [
            {
                imageHeight: 500,
                imageBgColor: '#333',
                imageSrc: './assets/updates/070/refresh-playlist.png',
                title: 'New in v0.7.0 - Refresh playlists 🎉',
                text: "Now you don't have to delete and re-add a playlist if it changes, you can simply update it directly from the user interface.",
                button: {
                    text: 'Nice!',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                imageHeight: 500,
                imageBgColor: '#333',
                imageSrc: './assets/updates/070/auto-refresh.png',
                title: 'Auto-refresh playlists 🎉',
                text: 'In addition, an auto-refresh playlist function is available so that the playlists will be updated automatically every time the app is started.',
                button: {
                    text: 'Okay',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
        ],
        '0.8.0': [
            {
                imageHeight: 310,
                imageBgColor: '#333',
                imageSrc: './assets/updates/080/translations.png',
                title: 'New in v0.8.0 - New translations 🎉',
                html: 'The new release includes the localization of the application into two new languages: Korean and Spanish. Many thanks to the contributors for the translation! (<a target="_blank" href="https://github.com/chaeya">@chaeya</a>, <a target="_blank" href="https://github.com/sguinetti">@sguinetti</a>, <a target="_blank" href="https://github.com/anthonyaxenov">anthonyaxenov</a>)',
                button: {
                    text: 'Nice!',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                title: 'User-Agent Support on Channel Level',
                html: 'Now user-agent support can be specified not only on the playlist level but also on the level of individual channels. For this purpose, support for Kodi <a target="_blank" href="https://github.com/4gray/iptvnator/issues/57">playlist format</a> was added to the application.',
                button: {
                    text: 'Next!',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                title: 'Information about current EPG program',
                html: 'Similarly to digital receivers, after you switch channels at the bottom of the screen you will see a pop-up window with information about the current program <a target="_blank" href="https://github.com/4gray/iptvnator/issues/51">#51</a>',
                imageHeight: 250,
                imageBgColor: '#333',
                imageSrc: './assets/updates/080/channel-info.png',
                button: {
                    text: 'Next!',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
            {
                title: 'This and that',
                html: 'In addition to the already mentioned new features, some bugs have been fixed and the internal dependencies of the application have been updated. Thanks for all the <a href="https://github.com/4gray/iptvnator/issues" target="_blank">ideas</a>, contributions and <a target="_blank" href="https://www.buymeacoffee.com/4gray">first donations.</a>',
                button: {
                    text: 'YAY!',
                    textColor: '#ccc',
                    bgColor: '#111',
                },
            },
        ],
    };

    /** Options for the "what is new" modal dialogs */
    options = {
        width: '500px',
        customStyle: {
            boxShadow: '0px 0px 10px 5px #111',
            backgroundColor: '#333',
            textColor: '#eee',
        },
    };

    /**
     * Changes the visibility state of the modal dialog
     * @param value flag to set
     */
    changeDialogVisibleState(value: boolean): void {
        this.dialogState$.next(value);
    }

    /**
     * Returns an array with modals for the provided version of the application
     * @param version version string
     */
    getModalsByVersion(version: string): ModalWindow[] {
        return this.modals[version] || [];
    }
}
