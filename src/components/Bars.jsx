/*This is the only rendered component of the app. The height of bars are the corresponding
values in the array(to be sorted). This component imports the algorithmic animation code
from another file 'animations.js'. Feel free to reach out for any suggestions/improvements.
*/
import React from 'react';
import './Bars.css';
import {selection_sort,bubble_sort,quicksort_anim} from '../algorithm_animations/animations';

let availwidth = window.screen.availWidth*0.9;
let bar_width = 30;
let array_size = (availwidth/(bar_width+3));
export let animation_delay = 50;

class Bars extends React.Component{
    constructor(props){
        super(props);
        this.state = {array: []};
        this.selection_sort=selection_sort.bind(this);
        this.bubble_sort=bubble_sort.bind(this);
        this.quicksort_anim= quicksort_anim.bind(this);
    }
    componentDidMount(){
        this.resetarray();
    }
    random_num(){
        return Math.floor(Math.random()*500+5);//Integer b/w 5 and 500
    }
    resetarray=()=>{
        const array = [];
        for(let i =0;i<array_size;i++){
            array.push(this.random_num());
        }
        this.setState({array});
    }
    sleep(ms){
        return new Promise(resolve=>setTimeout(resolve,ms));
    }

    //disables the buttons while animation is going on and vice versa
    toggle_buttons(state){
        let buttons = document.getElementsByClassName("button");
        for(let i of buttons){
            i.disabled=state;
        }
    }
    
    set_array_size = ()=>{
        array_size = document.getElementById("array_size").value;
        bar_width = (availwidth/array_size)-2;
        this.resetarray();
    }
    set_animation_delay = ()=>{
        animation_delay= document.getElementById("animation_delay").value;
    }
    stop_animation(){
        window.location.reload();
    }
    render(){
        let arr = this.state.array;
        return(
        <div className="container">
            <div className = "navbar">
                <button disabled = {false}className="button" onClick={this.resetarray}>New Array</button>
                <button disabled = {false}className="button" onClick = {this.quicksort_anim}>Quick Sort</button>
                <button disabled = {false}className="button" onClick = {this.selection_sort}>Selection Sort</button>
                <button disabled = {false}className="button" onClick={this.bubble_sort}>Bubble Sort</button>
                <label for="array_size">Array size</label>
                <input type="range" id="array_size"min="4"disabled={false}className="button"max={availwidth/5}
                onInput = {this.set_array_size}></input>
                <label for="animation_delay">Animation Delay</label>
                <input type="range" id="animation_delay"min="1" max="1000"defaultValue="100"
                onInput={this.set_animation_delay}></input>
                <button disabled = {false}onClick={this.stop_animation}>stop animation</button>
            </div>
            <div className= "main">
                {//maps the array values to corresponding div elements(bars)
                arr.map((value,idx)=>(<div className = "bars" key={idx}
                 style = {{height: `${value}px`,width:`${bar_width}px`}}></div>))
                }
            </div>
        </div>

            );
    }
}
export default Bars;