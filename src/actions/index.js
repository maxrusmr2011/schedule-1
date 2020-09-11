import {
  CHANGE_SCHEDULE_VIEW,
  CHANGE_TIMEZONE,
  HIDE_ALERT,
  HIDE_FORM_CREATION_EVENT,
  HIDE_FORM_EDIT_EVENT,
  HIDE_LOADER,
  LOADED_SCHEDULE,
  SHOW_ALERT,
  SHOW_FORM_CREATION_EVENT,
  SHOW_FORM_EDIT_EVENT,
  SHOW_LOADER,
  REMOVE_EVENT,
} from '../constants/actions-types';

export const showLoader = () => {
  return {
    type: SHOW_LOADER,
  };
};

export const hideLoader = () => {
  return {
    type: HIDE_LOADER,
  };
};

export const hideAlert = () => {
  return {
    type: HIDE_ALERT,
  };
};

export const showAlert = text => {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
};

export const changeScheduleView = newView => {
  return {
    type: CHANGE_SCHEDULE_VIEW,
    payload: newView,
  };
};

export const changeTimezone = newTimezone => {
  return {
    type: CHANGE_TIMEZONE,
    payload: newTimezone,
  };
};

export const showFormCreationEvent = () => {
  return {
    type: SHOW_FORM_CREATION_EVENT,
  };
};

export const hideFormCreationEvent = () => {
  return {
    type: HIDE_FORM_CREATION_EVENT,
  };
};

export const showFormEditEvent = id => {
  return {
    type: SHOW_FORM_EDIT_EVENT,
    payload: id,
  };
};

export const removeEvent = id => {
  return {
    type: REMOVE_EVENT,
    payload: id,
  };
};

export const hideFormEditEvent = () => {
  return {
    type: HIDE_FORM_EDIT_EVENT,
  };
};

export const scheduleLoaded = newSchedule => {
  return {
    type: LOADED_SCHEDULE,
    payload: newSchedule,
  };
};
