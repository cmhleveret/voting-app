export const pollTitleValidation = (title) => {
    if (title.length < 2) {
        return (true);
    } else {
        return (false);
    }
}

export const pollOptionsTitleValidation = (options, workingErrors) => {
    options.forEach((current, i) => {
        if (current.name.length < 2 && i < 2) {
            workingErrors.options[i] = true;
        }
        if (current.name.length > 2 && i < 2) {
            workingErrors.options[i] = false;
        }

        if (current.name.length > 0 && i > 1) {
            if (current.name.length < 2) {
                workingErrors.options[i] = true;
            }
            if (current.name.length > 2) {
                workingErrors.options[i] = false;
            }

        }
    })
}

const isValidUrl = urlString => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(urlString);
}

export const pollOptionsTitleUrlValidation = (options, workingErrors) => {

    options.forEach((current, i) => {
        if (!isValidUrl(current.url) && i < 2) {
            workingErrors.optionsUrls[i] = true;
        }

        if (isValidUrl(current.url) && i < 2) {
            workingErrors.optionsUrls[i] = false;
        }

        if (current.url.length > 0 && i > 1) {
            if (!isValidUrl(current.url)) {
                workingErrors.optionsUrls[i] = true;
            }
            if (isValidUrl(current.url)) {
                workingErrors.optionsUrls[i] = false;
            }
        }

    })
}

export const enoughPollOptionsValidation = (options) => {
    if (options.length < 2) {
        return true;
    } else {
        return false;
    }
}

export const dateTimeValidation = (dateTime) => {
    if (!isNaN(dateTime)) {
        return true;
    } else {
        return false;
    }
}

export const futureDateTimeValidation = (dateTime) => {
    let currentTime = new Date().getTime();
    if (dateTime < currentTime) {
        return true;
    } else {
        return false;
    }
}

export const readyToSubmit = (workingErrors) => {
    if (!workingErrors.title && !workingErrors.notEnoughOptions && !workingErrors.date && !workingErrors.time && !workingErrors.dateTime) {
        return true;
    } else {
        return false;
    }
}

const PollFormValidation = (props, date, time, dateTime) => {
    const workingErrors = {
        title: false,
        options: [false, false, false, false],
        optionsUrls: [false, false, false, false],
        notEnoughOptions: false,
        date: false,
        time: false,
        dateTime: false,
        submitForm: false,
    }

    workingErrors.title = pollTitleValidation(props.title);

    pollOptionsTitleValidation(props.options, workingErrors);

    pollOptionsTitleUrlValidation(props.options, workingErrors);

    workingErrors.notEnoughOptions = enoughPollOptionsValidation(props.options)

    workingErrors.date = dateTimeValidation(date)

    workingErrors.time = dateTimeValidation(time)

    workingErrors.dateTime = futureDateTimeValidation(dateTime)

    return workingErrors;
}

export default PollFormValidation;