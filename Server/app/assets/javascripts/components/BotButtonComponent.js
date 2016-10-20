import React, {Component, PropTypes, Children} from 'react';
import {connect} from 'react-redux';

import {ButtonComponent} from '../components/ButtonComponent';

import * as Actions from '../actions';

class BotButtonComponent extends Component{
    render(){
        if(this.props.bots != undefined && this.props.bots.length > 0){
            let currentBot = this.props.currentBot != undefined ? this.props.currentBot : this.props.bots[0];
            let items = this.props.bots.map(function(bot, index){
                let displayName = bot.name;
                if(currentBot.id == bot.id){
                    displayName = `${displayName} (Current)`;
                }
                return (
                    <li key={index}>
                        <a href="javascript:;" onClick={this.handleSelect.bind(this, bot)}><i className="fa fa-cube"></i> {displayName} </a>
                    </li>
                );
            }.bind(this));

            return (
                <div className="btn-group">
                    <button type="button" className="btn red-haze btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                        <i className="fa fa-cube"></i>
                        <span className="hidden-sm hidden-xs">&nbsp;{currentBot.name}&nbsp;</span>
                        <i className="fa fa-angle-down"></i>
                    </button>
                    <ul className="dropdown-menu" role="menu">
                        {items}
                        <li className="divider"> </li>
                        <li>
                            <a href="#/bots/new"><i className="fa fa-plus"></i> New Bot </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="btn-group">
                    <ButtonComponent href="#/bots/new" color="red-haze" icon="plus" text="New Bot" size="sm" />;
                </div>
            );
        }
    }

    handleSelect(bot, e){
        e.preventDefault();
        if(bot == undefined){
            return;
        }
        this.props.dispatch(Actions.changeCurrentBot(bot));
    }
}

BotButtonComponent.propTypes = {
    bots: React.PropTypes.array,
    currentBot: React.PropTypes.object
}

function select(state){
    return {};
}

export default connect(select)(BotButtonComponent);