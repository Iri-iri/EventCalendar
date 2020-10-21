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
          weeks[index].innerHTML += `<div style ="border: 3px solid #27ae60">${it.day}</div>`;
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

let events = [];

const timestampToDate = (ts) => {
  const d = new Date();
  d.setTime(ts);
  return ('0' + d.getDate()).slice(-2) + '.' + ('0' + (d.getMonth() + 1)).slice(-2) + '.' + d.getFullYear();
}

const displayTable = (element) => {
  tbody.innerHTML += `
          <tr><td class = "description">${element.description}</td>
          <td class = "start">${timestampToDate(element.start)}</td>
          <td class = "finish">${timestampToDate(element.finish)}</td></tr>
          `
}

const btn = document.querySelector("#btn");

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
      a: 100,
      b: 100,
      c: 100,
      visible: [],
      hidden: [],
    });

  }

  weeksTimeStamp = dates;
  
  weeksTimeStamp.forEach((item, j) => {
    const weeks = [...document.querySelectorAll(".week")];
    events.forEach((elem) => {
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
      if (item.visible.length > 3) {
        item.hidden = item.visible.slice(3);
      } 
    });

    if (item.visible.length > 0) {
      item.visible.slice(0, 3).forEach((el, index) => {
        let widthEventFree;
        let widthEv;
        let top = 35;
        let widthWeek = 7 * 24 * 60 * 60 * 1000;
        let widthEvent = (el.finish - el.start) + (24 * 60 * 60 * 1000);
        let eventLeft = (el.start - item.dayStartTS) / widthWeek * 100;
        let eventRight = (item.dayEndTS - el.finish) / widthWeek * 100;
        
        if (el.finish < item.dayEndTS) {
          widthEventFree = ((el.finish + 24 * 60 * 60 * 1000) - item.dayStartTS) / widthWeek * 100;
          widthEv = ((el.finish - item.dayStartTS) + (24 * 60 * 60 * 1000)) / widthWeek * 100;
        } else {
          widthEventFree = 100;
          widthEv = 100;
        }
        if (item.a >= widthEv) {
          top = 35;
          item.a = item.a - widthEventFree;
        } else if (item.b >= widthEv) {
          top = 60;
          item.b = item.b - widthEventFree;
        } else if (item.c >= widthEv) {
          top = 85;
          item.c = item.c - widthEventFree;
        }
        
        if (eventRight < 0 && eventLeft < 0) {
          widthEvent = widthWeek;
          eventLeft = 0;
        } else if (eventRight < 0) {
          widthEvent = (item.dayEndTS - el.start) + (24 * 60 * 60 * 1000)
        } else if (eventLeft < 0) {
          eventLeft = 0;
          widthEvent = widthWeek - (item.dayEndTS - el.finish);
        }
        
        weeks[j].innerHTML += `<div class="slide" style="left: ${eventLeft}%; width:${(widthEvent * 100) / widthWeek}%; top:${top}px;"></div>`;

        const slidesForCurrentWeek = [...weeks[j].querySelectorAll(".slide")];
        slidesForCurrentWeek[index].textContent = el.description;

      })

      const table = document.querySelector("#table");
      
        if (item.hidden.length > 0) {
          weeks[j].innerHTML += `<div class="hidden" data-index="${j}" style="left: ${0}%; width:${100}%; top:${110}px;"> ${item.hidden.length} more...</div>`;
        }
      
      const hiddenSlide = [...document.querySelectorAll(".hidden")];
      const modalWrapper = document.querySelector(".modal-wrapper");
      const closeBtn = document.querySelector("#closeBtn");
      const tbody = document.querySelector("#tbody");
      const upStart = document.querySelector("#upStart");
      const downStart = document.querySelector("#downStart");
      const upFinish = document.querySelector("#upFinish");
      const downFinish = document.querySelector("#downFinish");
      // let indexOfTable = table.dataset.number;

        hiddenSlide.forEach((el) => {
        el.addEventListener("click", (event) => {
          event.preventDefault();
          let indexOfHiddenSlide = el.dataset.index;
          table.dataset.number = el.dataset.index;
          modalWrapper.style.display = "block";
          tbody.innerHTML = "";
          weeksTimeStamp[indexOfHiddenSlide].hidden.forEach((elem) => {
            displayTable(elem);
          })

        })
        closeBtn.addEventListener("click", () => {
          modalWrapper.style.display = "none";
        });
          
        upStart.addEventListener("click", (event) => {
          event.preventDefault();
          let indexOfTable = table.dataset.number;
          weeksTimeStamp[indexOfTable].hidden.sort(function (a, b) {
            return a.start - b.start;
          });

          tbody.innerHTML = "";
          weeksTimeStamp[indexOfTable].hidden.forEach((elem) => {
            displayTable(elem);
          })
        }); 
          
        downStart.addEventListener("click", (event) => {
          event.preventDefault();
          let indexOfTable = table.dataset.number;
          weeksTimeStamp[indexOfTable].hidden.sort(function (a, b) {
            return b.start - a.start;
          });

          tbody.innerHTML = "";
          weeksTimeStamp[indexOfTable].hidden.forEach((elem) => {
            displayTable(elem);
          })
        });
        
        upFinish.addEventListener("click", (event) => {
          event.preventDefault();
          let indexOfTable = table.dataset.number;
          weeksTimeStamp[indexOfTable].hidden.sort(function (a, b) {
            return a.finish - b.finish;
          });

          tbody.innerHTML = "";
          weeksTimeStamp[indexOfTable].hidden.forEach((elem) => {
            displayTable(elem);
          })
        });  
          
        downFinish.addEventListener("click", (event) => {
          event.preventDefault();
          let indexOfTable = table.dataset.number;
          weeksTimeStamp[indexOfTable].hidden.sort(function (a, b) {
            return b.finish - a.finish;
          });

          tbody.innerHTML = "";
          weeksTimeStamp[indexOfTable].hidden.forEach((elem) => {
            displayTable(elem);
          })
        });  
          
      })
      }
  });
  
}

btn.addEventListener("click", (event) => {
  event.preventDefault();
  
  const slides = [...document.querySelectorAll(".slide")];
  slides.forEach(event => event.remove());
  const hiddenSlide = [...document.querySelectorAll(".hidden")];
  hiddenSlide.forEach(event => event.remove());

  dataTimeStamp();
  document.querySelector("#description").value = "";
})

