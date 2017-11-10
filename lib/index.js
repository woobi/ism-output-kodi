/**
* Intranet Station Manager
* kodi pvr output
*/
const debug = require('debug')('ism-output-kodi');

module.exports = class Out {
	constructor() {
		
	}
	
	tune ( tune ) {
		debug(' got a tune to out', tune );
		return Promise.resolve( tune );
	}
	
	untune( ) {
		return Promise.resolve();
	}
	
	channels ( channels ) {
		debug(' send channel list', channels);
		return channels;
	}
	
	playlist( stationString, channels ) {
		//debug( channels )
		let list = [ '#EXTM3U  tvg-shift=3'];
		Object.keys(channels.groups).forEach( group => {
			channels.groups[group].forEach( c => {
				let channel = channels.channels[c];
				list.push(`#EXTINF:-1 tvg-id="${channel.channel}" tvg-name="${channel.name}" tvg-logo="" group-title="${group}",${channel.channel}`);
				list.push(`http://studio.snowpi.org:3888/ism/${stationString}/${channel.tune}?norange=true`);	
			})
		});
		return Promise.resolve( list.join("\r\n") );
		
	}
		
}
