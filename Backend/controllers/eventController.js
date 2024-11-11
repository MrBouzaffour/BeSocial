const Event = require('../models/eventModel');
const { ValidationError } = require('../utils/errorHandler');
const Calendar = require('../models/calendarModel');

class EventController {
    /**
     * @description Creates an event in a specified calendar.
     * @param {Object} req - Express request object, expects `calendarId` in params and `title`, `date`, `location`, and `description` in body.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message and created event details.
     */
    static async createEvent(req, res, next) {
        const { calendarId } = req.params;
        const { title, date, location, description } = req.body;
        const userId = req.user.uid;

        if (!title || !date || !location || !description) {
            return res.status(400).json({ error: 'Title, date, location, and description are required' });
        }

        try {
            const eventData = { title, date, location, description, calendarId, createdBy: userId };
            const event = await Event.create(eventData);
            await Calendar.addEventToCalendar(calendarId, event.id);

            res.status(201).json({ message: 'Event created successfully', event });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Retrieves all events.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with an array of events.
     */
    static async getAllEvents(req, res, next) {
        try {
            const events = await Event.getAll();
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Retrieves a specific event by ID.
     * @param {Object} req - Express request object, expects `eventId` in params.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with event details.
     */
    static async getEventById(req, res, next) {
        const { eventId } = req.params;

        try {
            const event = await Event.getById(eventId);
            res.status(200).json(event);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Updates a specific event by ID.
     * @param {Object} req - Express request object, expects `eventId` in params and updated event data in body.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message and updated event details.
     */
    static async updateEvent(req, res, next) {
        const { eventId } = req.params;
        const updatedData = req.body;

        try {
            const updatedEvent = await Event.update(eventId, updatedData);
            res.status(200).json({ message: 'Event updated successfully', updatedEvent });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Deletes a specific event by ID.
     * @param {Object} req - Express request object, expects `eventId` in params.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message.
     */
    static async deleteEvent(req, res, next) {
        const { eventId } = req.params;

        try {
            await Event.delete(eventId);
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Adds a reminder to a specific event.
     * @param {Object} req - Express request object, expects `eventId` in params and `reminder` in body.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with success message after adding the reminder.
     */
    static async addReminder(req, res, next) {
        const { eventId } = req.params;
        const { reminder } = req.body;

        if (!reminder) {
            return next(new ValidationError('Reminder is required'));
        }

        try {
            const response = await Event.addReminder(eventId, reminder);
            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Retrieves all reminders for a specific event.
     * @param {Object} req - Express request object, expects `eventId` in params.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with an array of reminders for the event.
     */
    static async getReminders(req, res, next) {
        const { eventId } = req.params;

        try {
            const reminders = await Event.getReminders(eventId);
            res.status(200).json(reminders);
        } catch (error) {
            next(error);
        }
    }

    /**
     * @description Retrieves reminders due within a specific timeframe for the authenticated user.
     * @param {Object} req - Express request object, expects `timeframe` in query.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     * @returns {Object} JSON with an array of reminders due within the specified timeframe.
     */
    static async getRemindersDue(req, res, next) {
        const userId = req.user.uid;
        const { timeframe } = req.query;

        if (!timeframe) {
            return next(new ValidationError('Timeframe is required'));
        }

        try {
            const reminders = await Event.getRemindersByDueDate(userId, parseInt(timeframe));
            res.status(200).json(reminders);
        } catch (error) {
            next(error);
        }
    }
    /**
     * Gets all events for a specific calendar.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {void}
     */
    static async getEventsByCalendarId(req, res, next) {
        const { calendarId } = req.params;

        try {
            const events = await Event.getEventsByCalendarId(calendarId);
            res.status(200).json(events);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Deletes an event by its ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {void}
     */
    static async deleteEvent(req, res, next) {
        const { eventId } = req.params;

        try {
            await Event.delete(eventId);
            res.status(200).json({ message: 'Event deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = EventController;
