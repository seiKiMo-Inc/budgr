import Elysia, { t } from "elysia";

import AuthController from "@controllers/auth.ts";

import { Reminder as ReminderModel } from "@models/Reminder.ts";
import type { Reminder } from "@/types.ts";

export default new Elysia({ prefix: "/reminder" })
    .use(AuthController)
    .get(
        "/list",
        async ({ userData }) => {
            const populated = await userData.populate<{ reminders: Reminder[] }>("reminders");
            return { reminders: populated.reminders };
        },
        {
            auth: true
        }
    )
    .post(
        "/create",
        async ({ userData, body }) => {
            // Create the reminder.
            const reminder = await ReminderModel.create(body);

            // Add the reminder to the user.
            userData.reminders.push(reminder._id);
            await userData.save();

            return { reminder: reminder._id.toString("hex") };
        },
        {
            auth: true,
            body: t.Object({
                label: t.String(),
                payment: t.Optional(t.String())
            })
        }
    );
