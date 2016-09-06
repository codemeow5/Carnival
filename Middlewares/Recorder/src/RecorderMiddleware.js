"use strict";

import "babel-polyfill";

import schedule from './Schedule';

const ORIENTATION_INCOMING = 1;
const ORIENTATION_OUTGOING = 2;


function RecordUser(event){
    let channel_id = event.address.channelId;
    let user_id = event.address.user.id;
    let name = event.address.user.name;
    let extra = null;
    if(event.address != undefined){
        extra = JSON.stringify(event.address);
    }
    schedule.saveUser(channel_id, user_id, name, extra);
}

function RecordMessage(event, orientation){
    let text = event.text;
    let type = event.type;
    let source = event.source;
    let agent = event.agent;
    let user_id = event.address.user.id;
    let user_name = event.address.user.name;
    let channel_id = event.address.channelId;
    let conversation_id = event.address.conversation.id;
    let bot_id = event.address.bot.id;
    let bot_name = event.address.bot.name;
    schedule.saveMessage(
        text=text,
        type=type,
        source=source,
        agent=agent,
        user_id=user_id,
        user_name=user_name,
        channel_id=channel_id,
        conversation_id=conversation_id,
        bot_id=bot_id,
        bot_name=bot_name,
        orientation=orientation
    );
}

export default class RecorderMiddleware {
    receive(event, next){
        RecordUser(event);
        RecordMessage(event, ORIENTATION_INCOMING);
        next();
    }

    send(event, next){
        RecordMessage(event, ORIENTATION_OUTGOING);
        next();
    }

}