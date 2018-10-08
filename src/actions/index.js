import { FETCH_DATA, FETCH_DETAILS } from "./types";
import axios from "axios";

export const fetchWorker = async newData => {
  let workerData;
  let lastFetch = await new Date(localStorage.getItem("timeStamp"));
  console.log("the last fetch was done at: " + lastFetch);

  if (
    lastFetch === null ||
    lastFetch.setHours(lastFetch.getHours() + 24) < new Date()
  ) {
    console.log("fresh user, fresh data");

    workerData = await axios
      .get(
        `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=1`
      )
      .then(data => data.data);
    localStorage.setItem("workerData", JSON.stringify(workerData));
    localStorage.setItem("timeStamp", new Date());
    return {
      type: FETCH_DATA,
      payload: workerData
    };
  }
  workerData = JSON.parse(localStorage.getItem("workerData"));

  if (!newData) {
    console.log("valid localStorage, initial page visit ");
    return {
      type: FETCH_DATA,
      payload: workerData
    };
  }

  console.log("valid localStorage, request more data");

  workerData.current = workerData.current + 1;
  let newWorkerData = await axios
    .get(
      `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas?page=${
        workerData.current
      }`
    )
    .then(data => data.data.results);

  workerData.results.push(...newWorkerData);

  localStorage.setItem("workerData", JSON.stringify(workerData));
  localStorage.setItem("timeStamp", new Date());

  return {
    type: FETCH_DATA,
    payload: workerData
  };
};

export const fetchDetails = async id => {
  let workerDetails = await JSON.parse(localStorage.getItem(`worker:"${id}"`));

  if (
    workerDetails !== null &&
    new Date(workerDetails.timeStamp).setHours(
      new Date(workerDetails.timeStamp).getHours() + 24
    ) > new Date()
  ) {
    console.log("Using stored data");
  } else {
    console.log("Getting new Details data");
    workerDetails = await axios
      .get(
        `https://2q2woep105.execute-api.eu-west-1.amazonaws.com/napptilus/oompa-loompas/${id}`
      )
      .then(data => data.data);

    workerDetails.timeStamp = new Date();
    localStorage.setItem(`worker:"${id}"`, JSON.stringify(workerDetails));
  }

  return {
    type: FETCH_DETAILS,
    payload: workerDetails
  };
};
