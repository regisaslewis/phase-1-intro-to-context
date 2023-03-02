// Your code here
function createEmployeeRecord([name, surname, jobTitle, payRate]) {
  const employeeRecord = {
    firstName: name,
    familyName: surname,
    title: jobTitle,
    payPerHour: payRate,
    timeInEvents: [],
    timeOutEvents: []
  }
  return employeeRecord;
}

function createEmployeeRecords([...employeesInfo]) {
  const employeesData = []
  for (let data of employeesInfo) {
    employeesData.push(createEmployeeRecord(data));
  }
  return employeesData;
}

function createTimeInEvent(employeeRecordObj, dateStamp) {
  employeeRecordObj.timeInEvents.push({
    type: "TimeIn",
    hour: Number(dateStamp.slice(11, 15)),
    date: dateStamp.slice(0, 10)
  })
  return employeeRecordObj;
}

function createTimeOutEvent(employeeRecordObj, dateStamp) {
  employeeRecordObj.timeOutEvents.push({
    type: "TimeOut",
    hour: Number(dateStamp.slice(11, 15)),
    date: dateStamp.slice(0, 10)
  })
  return employeeRecordObj;
}

function hoursWorkedOnDate(employeeRecordObj, dateStamp) {
  for (let i = 0; i < employeeRecordObj.timeOutEvents.length; i++) {
    if (employeeRecordObj.timeInEvents[i].date === dateStamp && employeeRecordObj.timeOutEvents[i].date === dateStamp) {
      return (employeeRecordObj.timeOutEvents[i].hour - employeeRecordObj.timeInEvents[i].hour) / 100;
    }
  }
}

function wagesEarnedOnDate(employeeRecordObj, dateStamp) {
  return Number(hoursWorkedOnDate(employeeRecordObj, dateStamp) * employeeRecordObj.payPerHour);
}

function allWagesFor(employeeRecordObj) {
  let total = [];
  for (let i = 0; i < employeeRecordObj.timeOutEvents.length; i++) {
    total.push(
      wagesEarnedOnDate(employeeRecordObj, employeeRecordObj.timeOutEvents[i].date));
  }
  return total.reduce((a,b) => a + b, 0);
}

function calculatePayroll(allEmployeeData) {
  let payrollTotal = [];
  for (let i = 0; i < allEmployeeData.length; i++) {
    payrollTotal.push(allWagesFor(allEmployeeData[i]));
  }
  return payrollTotal.reduce((a, b) => a + b, 0);
}