import * as React from "react";
import "./autoCompleteContainer.css";
import NavigationHelper from "../utils/navigationHelper";
import {ClassRoom} from "../typings";
import * as FontAwesome from "react-fontawesome";
const Style = require("./autoCompleteContainer.css");

class AutoCompleteContainer extends React.Component<{onRecommendationClick?: (roomNumber: number) => any}, {items: AutoCompleteContainerItem[], visible: boolean}> {

    constructor(props) {
        super(props);

        //Default state
        this.state = {items: [], visible: false};

        //Bind onRecommendationClick to element
        this.onRecommendationClick = this.onRecommendationClick.bind(this);
    }

    update(text: string) {
        const items = [];

        //For each autoComplete result
        for (let room of NavigationHelper.getResults(text)) {

            //Create new container item and add it to the result array
            items.push(new AutoCompleteContainerItem({
                room: room,
                onClick: this.onRecommendationClick
            }));
        }

        //Add items, set visible to false
        this.setState({
           items, visible: true
        });
    }

    setVisibility(visible: boolean) {
        //Set state to visible
        this.setState({visible});
    }

    onRecommendationClick(room: ClassRoom) {
        //if onRecommendationClick is defined
        if(this.props.onRecommendationClick)
            //Call onRecommendationClick
            this.props.onRecommendationClick(room.number);
    }

    render() {
        let renderedItems;

        //If container is visible
        if(this.state.visible) {
            //For each element map rendered element
            renderedItems = this.state.items.map(function (element) {
                //Render element
                return element.render();
            });
        }

        return(
            <ul className="autoCompleteContainer" style={Style}>
                {renderedItems}
            </ul>
        );
    }
}

class AutoCompleteContainerItem extends React.Component<{room: ClassRoom, onClick?: (roomNumber: ClassRoom) => any}, {}> {

    onClick() {
        //If onClick is defined
        if(this.props.onClick)
            //Call onClick
            this.props.onClick(this.props.room);
    }

    render() {
        return(
            <li key={this.props.room.number} className="autoCompleteContainerItem" onClick={() => this.onClick()} style={Style}>
                <FontAwesome name="map-marker"/>
                <div>
                        <p>{"Raum " + this.props.room.number}</p>
                        <small>{this.props.room.description}</small>
                </div>
            </li>
        );
    }
}

export default AutoCompleteContainer;