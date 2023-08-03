const Moment = require("moment");
const extendMoment = require("moment-range").extendMoment;
const moment = extendMoment(Moment);
const fs = require("fs");

// const sampleData = require("./sample.json");s

const start = new Date("2023-06-26");
const end = new Date("2023-07-05");

function getDatesInRange(startDate, endDate) {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push({
      [moment(new Date(date)).format("L")]: Math.floor(Math.random() * 100),
    });
    date.setDate(date.getDate() + 1);
  }

  return dates;
}

const DATES_IN_RANGE = getDatesInRange(start, end);
// const DATES_IN_RANGE = sampleData;

fs.writeFile("sample.json", JSON.stringify(DATES_IN_RANGE, null, 2), (err) => {
  console.log(err);
});
// console.log(getDatesInRange(start, end));

const range = moment.range(start, end);

const monthsRange = range.diff("months");
const weeksRange = range.diff("weeks");
const daysRange = range.diff("days");
console.log(moment(start).isoWeekday());
console.log(moment(end).isoWeekday());
console.log(moment(start).week());
console.log(moment(end).week());
if (daysRange <= 15) {
  console.log("Displaying in DAYS range");
  const DAILY_ALERTS_COUNTS_BY_NUMBER = DATES_IN_RANGE.reduce(
    (acc, current, index) => {
      const currentDate = Object.keys(current)[0];
      const currentAlerts = current[Object.keys(current)[0]];

      if (acc[index + 1]) {
        return {
          ...acc,
          [index + 1]: acc[index + 1] + currentAlerts,
        };
      } else {
        return {
          ...acc,
          [index + 1]: currentAlerts,
        };
      }
    },
    {}
  );

  const output = Object.keys(DAILY_ALERTS_COUNTS_BY_NUMBER).map(
    (weekNumber, index) => ({
      [`Day ${index + 1}`]: DAILY_ALERTS_COUNTS_BY_NUMBER[weekNumber],
    })
  );
  console.log(output);
} else if (daysRange > 15 && weeksRange <= 12) {
  console.log("Displaying in WEEKS range");

  const WEEKLY_ALERTS_COUNTS_BY_NUMBER = DATES_IN_RANGE.reduce(
    (acc, current) => {
      const currentDate = Object.keys(current)[0];
      const currentAlerts = current[Object.keys(current)[0]];
      const currentDateWeekNumber = moment(currentDate).week();

      if (acc[currentDateWeekNumber]) {
        return {
          ...acc,
          [currentDateWeekNumber]: acc[currentDateWeekNumber] + currentAlerts,
        };
      } else {
        return {
          ...acc,
          [currentDateWeekNumber]: currentAlerts,
        };
      }
    },
    {}
  );

  const output = Object.keys(WEEKLY_ALERTS_COUNTS_BY_NUMBER).map(
    (weekNumber, index) => ({
      [`Week ${index + 1}`]: WEEKLY_ALERTS_COUNTS_BY_NUMBER[weekNumber],
    })
  );
  console.log(output);
} else if (weeksRange > 12) {
  console.log("Displaying in MONTHS range");

  const MONTHLY_ALERTS_COUNTS_BY_NUMBER = DATES_IN_RANGE.reduce(
    (acc, current) => {
      const currentDate = Object.keys(current)[0];
      const currentAlerts = current[Object.keys(current)[0]];
      const currentDateMonthNumber = moment(currentDate).month();

      if (acc[currentDateMonthNumber]) {
        return {
          ...acc,
          [currentDateMonthNumber]: acc[currentDateMonthNumber] + currentAlerts,
        };
      } else {
        return {
          ...acc,
          [currentDateMonthNumber]: currentAlerts,
        };
      }
    },
    {}
  );

  const output = Object.keys(MONTHLY_ALERTS_COUNTS_BY_NUMBER).map(
    (weekNumber, index) => ({
      [`Month ${index + 1}`]: MONTHLY_ALERTS_COUNTS_BY_NUMBER[weekNumber],
    })
  );
  console.log(output);
}

console.log({ monthsRange, weeksRange, daysRange });

// more than 15 - weeks

// more than 12 weeks - months
