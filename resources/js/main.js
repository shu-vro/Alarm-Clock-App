// Get Elements
const addBtn = document.querySelector(".add");
const goBackBtn = document.querySelector(".cross");

const cover2 = document.querySelector(".cover2");
const cover1 = document.querySelector(".cover1");
const clear_all_btn = document.querySelector(".clearAll");
const alarm_time_content = document.getElementById("alarm_time_content");

// create_day elements.
const sun = document.getElementById("sun");
const mon = document.getElementById("mon");
const tue = document.getElementById("tue");
const wed = document.getElementById("wed");
const thu = document.getElementById("thu");
const fri = document.getElementById("fri");
const sat = document.getElementById("sat");

const alarm_tone = new Audio();
alarm_tone.src = "resources/audio/Creepy-clock-chiming.mp3";

const all_days_element = document.querySelectorAll(".create_day input");
const stop_alarm = document.querySelector(".stop_alarm");

// Check today.
const clock = new Date();
let day_today = clock.getDay();
all_days_element.forEach((day) => {
    if (day.value == day_today) {
        day.checked = true;
    } else {
        day.checked = false;
    }
});

// Create custom alarm elements.
const volume = document.getElementById("volume");
const snooze_count = document.getElementById("snooze_count");
const snooze_time = document.getElementById("snooze_time");
const alarm_name = document.getElementById("name");

const done_button = document.querySelector(".audio_done");
let alarm_array = [];

// The add alarm button's action.
addBtn.addEventListener("click", () => {
    cover2.classList.add("on");
});

goBackBtn.addEventListener("click", () => {
    cover2.classList.remove("on");
});

// Stop alarm button
stop_alarm.addEventListener("click", () => {
    alarm_tone.pause();
    stop_alarm.classList.remove("active");
});

// To create multiple alarms.
class create_item {
    constructor(AlTime, AlName, AlVolume, AlRepeat, AlDay, AlTimeNow, date, time_array) {
        this.AlTime = AlTime;
        this.AlName = AlName;
        this.AlVolume = AlVolume;
        this.AlRepeat = AlRepeat;
        this.AlDay = AlDay;
        this.AlTimeNow = AlTimeNow;
        this.date = date;
        this.time_array = [];

        // Set the alarm function
        this.set_alarm();

        // create the alarm.
        this.createAlarm();
    }

    // Create Alarm function.
    createAlarm() {
        // An alarm's face
        let item = document.createElement("div");
        item.classList.add("item");
        item.setAttribute("data-number", `${alarm_array.length}`);
        cover1.appendChild(item);

        let row1 = document.createElement("div");
        row1.classList.add("row");
        row1.classList.add("row1");
        item.appendChild(row1);

        let alarm_time = document.createElement("span");
        alarm_time.classList.add("alarm_time");
        alarm_time.textContent =
            this.AlTime.substring(0, 2) < 12
                ? parseInt(this.AlTime)
                : parseInt(this.AlTime) - 12;
        alarm_time.textContent += ":" + this.AlTime.substring(3, 5);
        row1.appendChild(alarm_time);

        let alarm_zone = document.createElement("span");
        alarm_zone.classList.add("alarm_zone");
        alarm_zone.textContent = this.AlTime.substring(0, 2) < 12 ? "am" : "pm";
        row1.appendChild(alarm_zone);

        let alarm_name = document.createElement("span");
        alarm_name.classList.add("alarm_name");
        alarm_name.textContent = this.AlName;
        row1.appendChild(alarm_name);

        // let edit = document.createElement("i");
        // edit.classList.add("edit");
        // edit.classList.add("fas");
        // edit.classList.add("fa-edit");
        // row1.appendChild(edit);

        let delete_btn = document.createElement("i");
        delete_btn.classList.add("delete");
        delete_btn.classList.add("fas");
        delete_btn.classList.add("fa-trash-alt");

        // Action for delete alarm.
        delete_btn.addEventListener("click", () => {
            item.remove();
            this.time_array = [];
            let index = item.dataset.number;
            alarm_array.splice(index, 1);

            let items = document.querySelectorAll(".item");
            for (let i = 0; i < alarm_array.length; i++) {
                items[i].setAttribute("data-number", `${i}`);
            }
        });

        row1.appendChild(delete_btn);

        let row2 = document.createElement("div");
        row2.classList.add("row");
        row2.classList.add("row2");
        item.appendChild(row2);

        // For each day: sun, mon, tue....
        let day_name_sun = document.createElement("span");
        day_name_sun.classList.add("day_name");
        day_name_sun.textContent = "S";
        row2.appendChild(day_name_sun);

        let day_name_mon = document.createElement("span");
        day_name_mon.classList.add("day_name");
        day_name_mon.textContent = "M";
        row2.appendChild(day_name_mon);

        let day_name_tue = document.createElement("span");
        day_name_tue.classList.add("day_name");
        day_name_tue.textContent = "T";
        row2.appendChild(day_name_tue);

        let day_name_wed = document.createElement("span");
        day_name_wed.classList.add("day_name");
        day_name_wed.textContent = "W";
        row2.appendChild(day_name_wed);

        let day_name_thu = document.createElement("span");
        day_name_thu.classList.add("day_name");
        day_name_thu.textContent = "T";
        row2.appendChild(day_name_thu);

        let day_name_fri = document.createElement("span");
        day_name_fri.classList.add("day_name");
        day_name_fri.textContent = "F";
        row2.appendChild(day_name_fri);

        let day_name_sat = document.createElement("span");
        day_name_sat.classList.add("day_name");
        day_name_sat.textContent = "S";
        row2.appendChild(day_name_sat);

        // If all day array gets data of i, The day will be added with a class of 'is_active' (make the color of red).
        if (this.AlDay.includes("0")) {
            day_name_sun.classList.add("is_active");
        }
        if (this.AlDay.includes("1")) {
            day_name_mon.classList.add("is_active");
        }
        if (this.AlDay.includes("2")) {
            day_name_tue.classList.add("is_active");
        }
        if (this.AlDay.includes("3")) {
            day_name_wed.classList.add("is_active");
        }
        if (this.AlDay.includes("4")) {
            day_name_thu.classList.add("is_active");
        }
        if (this.AlDay.includes("5")) {
            day_name_fri.classList.add("is_active");
        }
        if (this.AlDay.includes("6")) {
            day_name_sat.classList.add("is_active");
        }

        let row3 = document.createElement("div");
        row3.classList.add("row");
        row3.classList.add("row3");
        item.appendChild(row3);

        let date_created = document.createElement("span");
        date_created.classList.add("date_created");

        // Set created time:
        let clock = new Date();
        let date_number =
            clock.toDateString() + " " + clock.toLocaleTimeString();
        date_created.textContent = "Created: " + date_number;
        row3.appendChild(date_created);
    }

    // Set Alarm function: 
    set_alarm() {
        // Get alarm volume
        alarm_tone.volume = this.AlVolume;
        // Make integer of hour and minute value with parsing.
        let minute_string = parseInt(this.AlTime.substring(0, 2));
        let second_string = parseInt(this.AlTime.substring(3, 5));

        // Array for time.
        // let this.time_array = [];

        // Push times
        this.AlDay.forEach((day) => {
            let push_day = day - this.AlTimeNow;

            if (push_day < 0) {
                push_day = 7 + push_day;
            }
            // let est= new Date('Apr 16, 1996 15:45:55 ');

            // Make a stable time
            let now_millisecond =
                this.date.getTime() -
                this.date.getHours() * 3600 * 1000 -
                this.date.getMinutes() * 60 * 1000 -
                this.date.getSeconds() * 1000;

            // Set a stable time.
            let push_time =
                now_millisecond +
                push_day * 24 * 3600 * 1000 +
                minute_string * 60 * 60 * 1000 +
                second_string * 60 * 1000;

            this.time_array.push(new Date(push_time));

            // If repeat is off, nothing happens. 
            // If repeat is 1, 3, 5 times, then: 
            if (this.AlRepeat.count == 0) {
                console.log("No repeat");
            } else if (this.AlRepeat.count == 1) {
                if (this.AlRepeat.time == 1) {
                    let push_time_1 =
                        now_millisecond +
                        push_day * 24 * 3600 * 1000 +
                        minute_string * 60 * 60 * 1000 +
                        1 * 60 * 1000 +
                        second_string * 60 * 1000;

                    // Make new time and push it in time array.
                    this.time_array.push(new Date(push_time_1));
                }
                if (this.AlRepeat.time == 3) {
                    let push_time_1 =
                        now_millisecond +
                        push_day * 24 * 3600 * 1000 +
                        minute_string * 60 * 60 * 1000 +
                        3 * 60 * 1000 +
                        second_string * 60 * 1000;

                    this.time_array.push(new Date(push_time_1));
                }
                if (this.AlRepeat.time == 5) {
                    let push_time_1 =
                        now_millisecond +
                        push_day * 24 * 3600 * 1000 +
                        minute_string * 60 * 60 * 1000 +
                        5 * 60 * 1000 +
                        second_string * 60 * 1000;

                    this.time_array.push(new Date(push_time_1));
                }
                if (this.AlRepeat.time == 10) {
                    let push_time_1 =
                        now_millisecond +
                        push_day * 24 * 3600 * 1000 +
                        minute_string * 60 * 60 * 1000 +
                        10 * 60 * 1000 +
                        second_string * 60 * 1000;

                    this.time_array.push(new Date(push_time_1));
                }
            } else if (this.AlRepeat.count == 3) {
                for (let i = 1; i < 4; i++) {
                    if (this.AlRepeat.time == 1) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 3) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 3 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 5) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 5 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 10) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 10 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                }
            } else if (this.AlRepeat.count == 5) {
                for (let i = 1; i < 6; i++) {
                    if (this.AlRepeat.time == 1) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 3) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 3 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 5) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 5 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                    if (this.AlRepeat.time == 10) {
                        let push_time_1 =
                            now_millisecond +
                            push_day * 24 * 3600 * 1000 +
                            minute_string * 60 * 60 * 1000 +
                            i * 10 * 60 * 1000 +
                            second_string * 60 * 1000;
    
                        this.time_array.push(new Date(push_time_1));
                    }
                }
            }
        });
        console.log(this.time_array);

        this.time_array.forEach((time) => {
            let Id = setInterval(() => {
                if (time - Date.now() <= 0 && time - Date.now() > -1000) {
                    console.log("Alarm Activated");
                    alarm_tone.play();
                    stop_alarm.classList.add("active");
                }
                if (time - Date.now() < -1001) {
                    clearInterval(Id);
                }
            }, 1000);
        });
    }
}

// Done Button
done_button.addEventListener("click", () => {
    let alarm = alarm_name.value || "Alarm";
    let volume_value = volume.value / 100;
    let day_values = [];

    let AlTime = alarm_time_content.value;
    let clock = new Date();
    let AlTimeNow = clock.getDay();

    // If days are checked, the day_values array (which is built to store sun, mon, tue... values) will be populated.
    if (sun.checked) {
        day_values.push(sun.value);
    }
    if (mon.checked) {
        day_values.push(mon.value);
    }
    if (tue.checked) {
        day_values.push(tue.value);
    }
    if (wed.checked) {
        day_values.push(wed.value);
    }
    if (thu.checked) {
        day_values.push(thu.value);
    }
    if (fri.checked) {
        day_values.push(fri.value);
    }
    if (sat.checked) {
        day_values.push(sat.value);
    }

    let AlRepeat = {
        count: snooze_count.value,
        time: snooze_time.value,
    };

    alarm_array.push(
        new create_item(
            AlTime,
            alarm,
            volume_value,
            AlRepeat,
            day_values,
            AlTimeNow,
            clock
        )
    );
    cover2.classList.remove("on");

    volume.value = 80;
    alarm_name.value = "Alarm";
    alarm_time_content.value = "06:00";

    snooze_count.value = 0;
    snooze_time.value = 0;
});

clear_all_btn.addEventListener("click", () => {
    let items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.remove();
    });
    alarm_array = [];
});
