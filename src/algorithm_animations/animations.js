/* This is the animation code for all the sorting algorithms. Please have a look at 
methods of Bars.jsx before reading this code because those methods have been used here.
The functions here have been written in the context of 'Bars.jsx' component. They have
been imported in Bars.jsx and binded there. It means that the 'this' keyword in these
functions should be taken as 'this' from Bars.jsx. Suggestions/improvements are welcome!
*/
import {animation_delay} from '../components/Bars';

export async function selection_sort(){
    this.toggle_buttons(true);
    let arr = this.state.array;
    let bars = document.getElementsByClassName("bars");
    for(let i=0;i<arr.length;i++){
        let min_idx = i;
        for(let j = i+1;j<arr.length;j++){
            bars[j].style.backgroundColor = "red";
            await this.sleep(animation_delay);
            if(arr[j]<arr[min_idx]){
                bars[min_idx].style.backgroundColor = "black";
                await this.sleep(animation_delay);
                min_idx=j
            }
            else{
                bars[j].style.backgroundColor = "black";
                await this.sleep(animation_delay);
            }
        }
        [arr[i],arr[min_idx]]=[arr[min_idx],arr[i]];
        this.setState({array:arr});
        bars[i].style.backgroundColor = "red";
        if(i!=min_idx){
            bars[min_idx].style.backgroundColor = "black";
        }
        await this.sleep(animation_delay);
    }
    this.setState({array:arr});
    await this.sleep(1000)
    for(let bar of bars){
        bar.style.backgroundColor= "black";
    }
    this.toggle_buttons(false);
}

export async function bubble_sort (){
    this.toggle_buttons(true);
    let arr = this.state.array;
    let bars = document.getElementsByClassName("bars");
    for(let i=arr.length-2;i>=0;i--){
        for(let j =0;j<=i;j++){
            bars[j].style.backgroundColor="red";
            bars[j+1].style.backgroundColor="red";
            await this.sleep(animation_delay);
            if(arr[j+1]<arr[j]){
                [arr[j+1],arr[j]]=[arr[j],arr[j+1]];
                this.setState({array:arr});
                await this.sleep(animation_delay);
                bars[j].style.backgroundColor="black";
                bars[j+1].style.backgroundColor="black";
            }
            else{
                bars[j].style.backgroundColor="black";
                bars[j+1].style.backgroundColor="black";
                await this.sleep(animation_delay);
            }
        }
        bars[i+1].style.backgroundColor="red";
    }
    bars[0].style.backgroundColor="red";
    this.setState({array:arr})
    await(this.sleep(500));
    for(let bar of bars){
        bar.style.backgroundColor="black"; 
    }
    this.toggle_buttons(false);
}

export async function quicksort_anim(){
    const quicksort= async(arr,low,high)=>{
        if(low>=high){
            return
        }
        let pi= await partition(arr,low,high);
        await quicksort(arr,low,pi-1);
        await quicksort(arr,pi+1,high);
    }
    const partition = async(arr,low,high)=>{
        var bars = document.getElementsByClassName("bars");
        bars[high].style.backgroundColor= "blue";
        let pivot= arr[high];
        let i=low-1;
        let j = low;
        while(j<high){
            bars[j].style.backgroundColor= "red";
            await this.sleep(animation_delay);
            if(arr[j]<=pivot){
                let temp= arr[j];
                arr[j]=arr[++i];
                arr[i]=temp;
                bars[j].style.backgroundColor = "black";
                this.setState({array:arr});
                bars[i].style.backgroundColor = "red";
                await this.sleep(animation_delay);
                bars[i].style.backgroundColor = "black";
            }
            bars[j].style.backgroundColor = "black";
            j++;
        }
        let temp= arr[high];
        arr[high]=arr[++i];
        arr[i]=temp;
        this.setState({array:arr});
        bars[i].style.backgroundColor = "blue";
        bars[high].style.backgroundColor = "black";
        await this.sleep(animation_delay);
        bars[i].style.backgroundColor = "black";
        return i;
    }
    this.toggle_buttons(true);
    let arr = this.state.array;
    let low = 0;
    let high = arr.length-1;
    await quicksort(arr,low,high);
    this.toggle_buttons(false);
}