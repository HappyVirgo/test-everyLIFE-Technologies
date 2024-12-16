import { CalendarEventRepository } from "@fs-tech-test/calendar-domain";

export const eventValidator = async (data: EventPayload, repository: CalendarEventRepository)  => {
    const isValid = await repository.findOneOrFail({...data})
    return isValid.id;
}