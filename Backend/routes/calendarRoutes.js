const express = require('express');
const CalendarController = require('../controllers/calendarController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

/**
 * @route POST /api/calendars
 * @description Create a new calendar for the authenticated user
 * @access Protected - requires user authentication
 * 
 * Request Body:
 * {
 *   "name": "Calendar Name",
 *   "type": "personal or group"
 * }
 * 
 * Response:
 * - Success: Status 201 with message and calendar details if created successfully.
 * - Error: Status 400 or 500 with error details if there was an issue.
 */
router.post('/', authMiddleware, CalendarController.createCalendar);

/**
 * @route GET /api/calendars
 * @description Retrieve all calendars associated with the authenticated user
 * @access Protected - requires user authentication
 * 
 * Response:
 * - Success: Status 200 with an array of the user's calendars.
 * - Error: Status 400 or 500 with error details if retrieval fails.
 */
router.get('/', authMiddleware, CalendarController.getUserCalendars);

/**
 * @route POST /api/calendars/:calendarId/events
 * @description Add an event to a specific calendar by ID
 * @access Protected - requires user authentication
 * 
 * URL Params:
 * - :calendarId - The ID of the calendar to add an event to
 * 
 * Request Body:
 * {
 *   "title": "Event Title",
 *   "date": "YYYY-MM-DDTHH:MM:SSZ",
 *   "location": "Event Location",
 *   "description": "Event Description"
 * }
 * 
 * Response:
 * - Success: Status 201 with a message, the event details, and a link confirmation to the calendar.
 * - Error: Status 400, 401, or 500 with error details if there was an issue.
 */
router.post('/:calendarId/events', CalendarController.addEventToCalendar);

/**
 * @route POST /api/calendars/:calendarId/members
 * @description Add a user to a calendar group by calendar ID
 * @access Protected - requires user authentication
 * 
 * URL Params:
 * - :calendarId - The ID of the calendar to add a member to
 * 
 * Request Body:
 * {
 *   "userId": "<USER_ID>" // The ID of the user to add to the calendar
 * }
 * 
 * Response:
 * - Success: Status 200 with a message indicating the user was added.
 * - Error: Status 400, 401, or 500 with error details if there was an issue.
 */
router.post('/:calendarId/members', CalendarController.addUserToCalendarGroup);

/**
 * @route GET /api/calendars
 * @description Retrieve a calendar based on its type (individual or group) for the authenticated user
 * @access Protected - requires user authentication
 * 
 * Query Params:
 * - `type` (optional): "individual" (default) or "group" to specify the calendar type to retrieve
 * 
 * Response:
 * - Success: Status 200 with the calendar details for the specified type.
 * - Error: Status 400, 401, or 500 with error details if there was an issue.
 */
router.get('/type', CalendarController.getUserCalendarByType);

module.exports = router;
