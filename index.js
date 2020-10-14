const init = () => {
  const dateTitle = new Date();
  const monthsTitle = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  titleOfCalendar(dateTitle, monthsTitle);
  setWeeksGrid(dateTitle);
  prevTitleOfCalendar(dateTitle, monthsTitle);
  nextTitleOfCalendar(dateTitle, monthsTitle);
}

const data = (year, month) => {
  const nowDay = new Date().getDate();
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();
  const startDate = new Date(year, month, 1); /* first day of month */
  const endDate = new Date(year, month + 1, 0); /* last day of month */
  const dayOfStartDay = startDate.getDay(); /* day number of week */
  const currentMonthTotalDays = endDate.getDate(); /* amount days in current month */
  const totalWeeks = Math.ceil(
    (currentMonthTotalDays + dayOfStartDay) / 7
  ); /* total weeks in month */
  const prevMonthEndDate = new Date(
    year,
    month,
    0
  ); /* end day of previous month */
  const dates = [];
  let prevMonthDay =
    prevMonthEndDate.getDate() -
    dayOfStartDay +
    1; /* get first Sunday of first week */
  let nextMonthDay = 1;

  for (let i = 0; i < totalWeeks * 7; i += 1) {
    // replace to
    let date;
    if (i < dayOfStartDay) {
      /* if month does not start on Sunday */
      date = new Date(year, month - 1, prevMonthDay);
      prevMonthDay = prevMonthDay + 1;
    } else if (i > currentMonthTotalDays + (dayOfStartDay - 1)) {
      /* if month does not end on Saturday */
      date = new Date(year, month + 1, nextMonthDay);
      nextMonthDay = nextMonthDay + 1;
    } else {
      date = new Date(
        year,
        month,
        i - dayOfStartDay + 1
      ); /* current month dates */
    }

    if (
      date.getDate() === nowDay &&
      date.getMonth() === nowMonth &&
      date.getFullYear() === nowYear
    ) {
      dates.push({
        day: date.getDate(),
        dayTS: date.getTime(),
        today: "today",
      });
    } else if (
      date.getMonth() === nowMonth &&
      date.getFullYear() === nowYear) {
      dates.push({
        day: date.getDate(),
        dayTS: date.getTime(),
        month: "current",
      });
    } else {
      dates.push({
        day: date.getDate(),
        dayTS: date.getTime(),
      })
    }
  }

  const weeks = [];
  for (let i = 0; i < Math.ceil(dates.length / 7); i++) {
    weeks[i] = dates.slice(i * 7, i * 7 + 7);
  }
  
  // console.log(weeks)
    return weeks;
    
  }
  
  const setWeeksGrid = (date) => {
    currentDate = date.setMonth(date.getMonth());
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDay();
    const weeks = data(year, month, day);
    displayCalendar(weeks);
    console.log("weeks", weeks);
  }
  

const displayCalendar = (currentWeek) => {
  const weekAll = document.querySelector(".weekAll");
  weekAll.innerHTML = "";
  
  currentWeek.forEach((item, index) => {
  weekAll.innerHTML += `<div class="week"></div>`;
  
  const weeks = [...document.querySelectorAll(".week")];
  weeks[index].innerHTML = "";
  
    item.forEach((it) => {
        if (it.today === "today") {
          weeks[index].innerHTML += `<div style ="color: #fff; background-color: #27ae60">${it.day}</div>`;
        } else if (it.month === "current") {
          weeks[index].innerHTML += `<div>${it.day}</div>`;
        } else {
          weeks[index].innerHTML += `<div style ="color: #999">${it.day}</div>`;
        }
  });
  });
  };

const titleOfCalendar = (date, month) => {
  let newDate = document.querySelector("#date");
  newDate.innerHTML = `${month[date.getMonth()]} ${date.getFullYear()}`;
}

const prevTitleOfCalendar = (date, month) => {
  document.querySelector("#prev").addEventListener("click", () => {
    let prevDate = date.setMonth(date.getMonth() - 1);
    titleOfCalendar(date, month);
    setWeeksGrid(date, prevDate);
  });
}

const nextTitleOfCalendar = (date, month) => {
  document.querySelector("#next").addEventListener("click", () => {
    let nextDate = date.setMonth(date.getMonth() + 1);
    titleOfCalendar(date, month);
    setWeeksGrid(date, nextDate);
  });
}

init();

// let visible = [];
let events = [];

const dataTimeStamp = () => {
  const nowMonth = new Date().getMonth();
  const nowYear = new Date().getFullYear();
  const startDate = new Date(nowYear, nowMonth, 1); /* first day of month */
  const endDate = new Date(nowYear, nowMonth + 1, 0); /* last day of month */
  const dayOfStartDay = startDate.getDay(); /* day number of week */
  const currentMonthTotalDays = endDate.getDate(); /* amount days in current month */
  const totalWeeks = Math.ceil((currentMonthTotalDays + dayOfStartDay) / 7); /* total weeks in month */
  const prevMonthEndDate = new Date(nowYear, nowMonth, 0); /* end day of previous month */
  const dates = [];
  let prevMonthDay = prevMonthEndDate.getDate() - dayOfStartDay + 1; /* get first Sunday of first week */
  let nextMonthDay = 1;


  let description = document.querySelector("#description");
  let start = document.querySelector("#start");
  let finish = document.querySelector("#finish");


  let obj = {
    description: description.value,
    start: Date.parse(start.value) - (3 * 60 * 60 * 1000),
    finish: Date.parse(finish.value) - (3 * 60 * 60 * 1000),
  }
    events.push(obj);
    console.log("events", events);


  for (let i = 0; i < totalWeeks * 7; i += 7) {

    let date;
    let dateEnd = new Date(nowYear, nowMonth, i - dayOfStartDay + 7);

    if (i < dayOfStartDay) {
      /* if month does not start on Sunday */
      date = new Date(nowYear, nowMonth - 1, prevMonthDay);
      prevMonthDay = prevMonthDay + 1;
    } else if (i > currentMonthTotalDays + (dayOfStartDay - 1)) {
      /* if month does not end on Saturday */
      date = new Date(nowYear, nowMonth + 1, nextMonthDay);
      nextMonthDay = nextMonthDay + 1;
    } else {
      date = new Date(nowYear, nowMonth, i - dayOfStartDay + 1); /* current month dates */
    }
    dates.push({
      dayStart: date.getDate(),
      dayStartTS: date.getTime(),
      dateEnd: dateEnd.getDate(),
      dayEndTS: dateEnd.getTime(),
      a: "100",
      b: "100",
      c: "100",
      visible: [],
    });

  }

  weeksTimeStamp = dates;
  
  weeksTimeStamp.forEach((item, j) => {

    const weeks = [...document.querySelectorAll(".week")];
    debugger
    events.forEach((elem) => {
      // weeks.innerHTML = "";
      if ((elem.start >= item.dayStartTS) && (elem.finish <= item.dayEndTS)) {
        item.visible.push(elem);
      } else if ((elem.start >= item.dayStartTS) && (elem.start <= item.dayEndTS)) {
        item.visible.push(elem);
      } else if ((elem.finish >= item.dayStartTS) && (elem.finish <= item.dayEndTS)) {
        item.visible.push(elem);
      } else if ((elem.start < item.dayStartTS) && (elem.start > item.dayEndTS)) {
        item.visible.push(elem);
      } else if ((elem.start <= item.dayStartTS) && (elem.finish >= item.dayEndTS)) {
        item.visible.push(elem);
      };
    });

    if (item.visible.length > 0) {
      item.visible.forEach((el)=>{
        // debugger
        let top = 35;
        let widthWeek = 7 * 24 * 60 * 60 * 1000;
        let widthEvent = (el.finish - el.start) + (24 * 60 * 60 * 1000);
        weeks[j].innerHTML += `<div class="slide" style="left: ${(el.start - item.dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`;
        // debugger
    })
  }
    // });
  });
  // function pushEvent(mock, index, elem) {
  //   if (mock[index].visible.length >= 3) {
  //     return mock[index].hidden.push(Object.assign({}, elem));
  //   } else {
  //     return mock[index].visible.push(Object.assign({}, elem));
  //   }
  // }
  // let top = 35;
  // weeksTimeStamp.forEach((item) => {
  //   // debugger
  //   let widthWeek = 7 * 24 * 60 * 60 * 1000;
  //   let widthEvent = (obj.finish - obj.start) + (24 * 60 * 60 * 1000);
  //   const weeks = [...document.querySelectorAll(".week")];
  //   for (let j = 0; j < totalWeeks; j++) {
  //     if ((obj.start >= item[j].dayStartTS) && (obj.finish <= item[j].dayEndTS)) {
  //       item[j].visible = visible;
  //       let top = 35;
  //       console.log(visible);
  //       console.log(weeks);
  //       // visible.forEach(function (it, k) {
  //       //   if (visible[k - 1] && visible[k - 1].finish <= it.start) { 
  //       //     top += 30;
  //       //   }
  //       //   console.log(top)
  //       //   debugger
  //       //   if (top <= 120) {
  //           weeks[j].innerHTML += `<div class="slide" style="left: ${(obj.start - item[j].dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`
  //           console.log(top)
  //           // debugger
  //           // const slide = document.querySelector(".slide");
  //           // slide.textContent = obj.description;
  //       //   }
  //       // })
  //     }
  //   }
  // })


  // weeksTimeStamp.forEach((item) => {
  //   // debugger
  //   let top = 35;
  //   let widthWeek = 7 * 24 * 60 * 60 * 1000;
  //   let widthEvent = (obj.finish - obj.start) + (24 * 60 * 60 * 1000);
  //   const weeks = [...document.querySelectorAll(".week")];
  //   for (let j = 0; j < totalWeeks; j++) {
  //     if ((obj.start >= item[j].dayStartTS) && (obj.finish <= item[j].dayEndTS)) {
  //       item[j].visible = visible;
  //       console.log(visible);
  //       console.log(weeks);

  //       let lastEvent = visible.pop();
  //       console.log(lastEvent);
  //       if (visible.find((it) => it.finish >= lastEvent.start )) {
  //         top += 45;
  //         debugger
  //         weeks[j].innerHTML += `<div class="slide" style="left: ${(obj.start - item[j].dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`
  //         // } else if (visible.find((it) => { it.finish >= lastEvent.start }) && (top === 35)) {
  //         //   top += 30;
  //         //  debugger
  //         //   console.log(top);
  //         //   weeks[j].innerHTML += `<div class="slide" style="left: ${(obj.start - item[j].dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`
  //       }else {
  //         weeks[j].innerHTML += `<div class="slide" style="left: ${(obj.start - item[j].dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${35}px;"></div>`
  //         const slide = document.querySelector(".slide");
  //         slide.textContent = obj.description;
  //       }
  //       visible.push(lastEvent);
  //       console.log(visible);
  //       // visible.forEach(function (it, k) {
  //       //   if (visible[k - 1] && visible[k - 1].finish <= it.start) { 
  //       //     top += 30;
  //       //   }
  //       //   console.log(top)
  //       //   debugger
  //       //   if (top <= 120) {
  //           // weeks[j].innerHTML += `<div class="slide" style="left: ${(obj.start - item[j].dayStartTS) / widthWeek * 100}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`
  //           // console.log(top)
  //           // debugger
  //           // const slide = document.querySelector(".slide");
  //           // slide.textContent = obj.description;
  //       //   }
  //       // })
  //     }
  //   }
  // })

  console.log("weeksTimeStamp", weeksTimeStamp);

}

btn.addEventListener("click", function (event) {
  event.preventDefault();
  dataTimeStamp();
})