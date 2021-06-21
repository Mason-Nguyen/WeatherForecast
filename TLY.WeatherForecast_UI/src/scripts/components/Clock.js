import React, { useState, useEffect } from "react";

import "../../scss/Clock.scss"

import { composeFunc } from "../helpers/functionHelper"

const Clock = () => {
    const [timeData, setTimeData] = useState(null);

    useEffect(() => {
        var interval = setInterval(() => setTimeData(_parseTimeDataFunc(new Date())), 1000)

        return () => {
            clearInterval(interval)
        };
    }, []);

    const _serializeClockTime = dateTime =>
    ({
        hours: dateTime.getHours(),
        minutes: dateTime.getMinutes(),
        seconds: dateTime.getSeconds(),
        ampm: ""
    })

    const _civilianHours = clockTime =>
    ({
        ...clockTime,
        hours: (clockTime.hours > 12) ?
            clockTime.hours - 12 :
            clockTime.hours
    })

    const _appendAMPM = clockTime =>
    ({
        ...clockTime,
        ampm: (clockTime.hours >= 12) ? "PM" : "AM"
    })

    const _prependZero = key => clockTime =>
    ({
        ...clockTime,
        [key]: (clockTime[key] < 10) ?
            "0" + clockTime[key] :
            clockTime[key]
    })

    const _convertToCivilianTime = clockTime =>
        composeFunc(
            _appendAMPM,
            _civilianHours
        )(clockTime)

    const _doubleDigits = civilianTime =>
        composeFunc(
            _prependZero("hours"),
            _prependZero("minutes"),
            _prependZero("seconds")
        )(civilianTime)

    const _parseTimeDataFunc = composeFunc(
        _serializeClockTime,
        _convertToCivilianTime,
        _doubleDigits,
    )

    return (
        timeData && <div>
            <span className="hour">{timeData.hours}:</span>
            <span className="minute">{timeData.minutes}:</span>
            <span className="second">{timeData.seconds}:</span>
            <span className="ampm">{timeData.ampm}</span>
        </div>
    )
}

export default Clock