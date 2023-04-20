class Timer{
    constructor() {
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        this.miliseconds = 0;
        this.isStarted = false;
    }

    start(to_show_timer=true, id="timer") {
        if (!this.isStarted) {
            this.isStarted = true;
            this.interval = setInterval(() => {
                this.miliseconds += 1;
                this.seconds = parseInt(this.miliseconds / 10, 10);
                this.minutes = parseInt(this.seconds / 60, 10);
                this.hours = parseInt(this.minutes / 60, 10);
                if (to_show_timer) this.show_timer(id);
            }, 100);
        }
    }

    show_timer(id) {
        document.getElementById(id).innerHTML = (this.hours % 24).toString().padStart(2, '0') + 
            ":" + (this.minutes % 60).toString().padStart(2, '0') + 
            ":" + (this.seconds % 60).toString().padStart(2, '0') + 
            ":" + this.miliseconds % 10;
        // console.log(this.hours + ":" + this.minutes + ":" + this.seconds + ":" + this.miliseconds);
    }

    stop() {
        clearInterval(this.interval);
        this.isStarted = false;
    }

    reset(to_show_timer=true, id="timer") {
        this.stop();
        this.hours = this.minutes = this.seconds = this.miliseconds = 0;
        if (to_show_timer) this.show_timer(id);
    }

    get_miliseconds(){
        return this.miliseconds;
    }
};