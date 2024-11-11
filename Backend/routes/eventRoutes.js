const express = require('express');
const EventController = require('../controllers/eventController');

const router = express.Router();

/**
 * POST /:calendarId/events
 * Creates a new event in the specified calendar.
 * 
 * Request Parameters:
 * - calendarId (URL parameter): The ID of the calendar where the event will be created.
 * 
 * Request Body:
 * - title: The title of the event.
 * - date: The date and time of the event.
 * - location: The location where the event is held.
 * - description: A short description of the event.
 * 
 * Response:
 * - 201 Created: The event is successfully created and added to the calendar.
 * - Returns the created event object with its details.
 */
router.post('/:calendarId/events', EventController.createEvent);

/**
 * GET /
 * Retrieves all events across all calendars.
 * 
 * Response:
 * - 200 OK: Returns an array of all event objects.
 */
router.get('/', EventController.getAllEvents);

/**
 * GET /:eventId
 * Retrieves the details of a specific event by its ID.
 * 
 * Request Parameters:
 * - eventId (URL parameter): The ID of the event to retrieve.
 * 
 * Response:
 * - 200 OK: Returns the details of the specified event.
 * - 404 Not Found: If the event with the given ID does not exist.
 */
router.get('/:eventId', EventController.getEventById);

/**
 * POST /:eventId/reminders
 * Adds a reminder to a specific event.
 * 
 * Request Parameters:
 * - eventId (URL parameter): The ID of the event to which the reminder will be added.
 * 
 * Request Body:
 * - reminder: The reminder details to be added to the event.
 * 
 * Response:
 * - 200 OK: The reminder is successfully added to the event.
 * - Returns a confirmation message.
 */
router.post('/:eventId/reminders', EventController.addReminder);

/**
 * GET /:eventId/reminders
 * Retrieves all reminders for a specific event.
 * 
 * Request Parameters:
 * - eventId (URL parameter): The ID of the event whose reminders are to be retrieved.
 * 
 * Response:
 * - 200 OK: Returns an array of reminders associated with the event.
 * - 404 Not Found: If the event with the given ID does not exist or has no reminders.
 */
router.get('/:eventId/reminders', EventController.getReminders);

// Get all events for a specific calendar
/**
 * @route GET /api/events/:calendarId
 * @description Retrieves all events for a specific calendar
 * @access Protected - requires user authentication
 */
router.get('/:calendarId', EventController.getEventsByCalendarId);

// Delete an event
/**
 * @route DELETE /api/events/:eventId
 * @description Deletes an event by its ID
 * @access Protected - requires user authentication
 */
router.delete('/:eventId', EventController.deleteEvent);


// make an event public/ private
module.exports = router;
