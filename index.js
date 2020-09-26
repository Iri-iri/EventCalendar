const date = new Date();
const months = [
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

function data(year, month) {
  const nowDay = new Date().getDate();
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
  console.log(prevMonthDay);
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
      date.getMonth() === month &&
      date.getFullYear() === year
    ) {
      dates.push({
        day: date.getDate(),
        dayTS: date.getTime(),
        today: "today",
      });
    } else {
      dates.push({ day: date.getDate(), dayTS: date.getTime() });
    }
  }
  const weeks = [];
  for (let i = 0; i < Math.ceil(dates.length / 7); i++) {
    weeks[i] = dates.slice(i * 7, i * 7 + 7);
  }

  return weeks;
}

function setWeeksGrid(currentDate) {
  currentDate = date.setMonth(date.getMonth());
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDay();
  const weeks = data(year, month, day);
  displayCalendar(weeks);
  console.log("weeks", weeks);
}

function displayCalendar(currentWeek) {
  const days = document.querySelector(".days");
  days.innerHTML = "";
  currentWeek.forEach(function (item) {
    for (let i = 0; i < 7; i++) {
      days.innerHTML += `<div>${item[i].day}</div>`;
    }
  });
}

setWeeksGrid();

function titleOfCalendar() {
  let newDate = document.querySelector("#date");
  newDate.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
}

titleOfCalendar();

document.querySelector("#prev").addEventListener("click", () => {
  let prevDate = date.setMonth(date.getMonth() - 1);
  titleOfCalendar();
  setWeeksGrid(prevDate);
});

document.querySelector("#next").addEventListener("click", () => {
  let nextDate = date.setMonth(date.getMonth() + 1);
  titleOfCalendar();
  setWeeksGrid(nextDate);
});
