import type {
    F1FantasyCircuit,
    F1FantasyCircuitSession,
    F1FantasyFixture,
    F1FantasyScheduleResponse,
} from './api/f1-schedule-response.type';

/* ================================
   TYPES
================================ */

export type F1ScheduleSessionSource = 'fixture' | 'circuit';

export type F1ScheduleSession = {
    id: number;
    meetingId: number;
    meetingNumber: number;

    sessionName: string;
    sessionType: string;
    sessionNumber: number | null;

    startDate: string;
    endDate: string;

    fomMeetingSessionKey: number | null;

    matchdayId: number | null;
    matchdayName: string | null;
    raceDay: number | null;

    isLocked: boolean | null;
    isCurrent: boolean | null;
    isLive: boolean | null;
    isLeaderboardShow: boolean | null;
    isActiveForNewUser: boolean | null;
    isPostponed: boolean | null;

    nextMatchDeadline: string | null;

    source: F1ScheduleSessionSource;
};

export type F1ScheduleMeeting = {
    meetingId: number;
    meetingNumber: number;

    meetingName: string;
    meetingOfficialName: string;
    meetingLocation: string;
    circuitLocation: string;
    circuitOfficialName: string;
    circuitShortName: string | null;

    countryId: number | null;
    countryName: string | null;

    scheduledLapCount: number | null;
    scheduledDistance: number | null;
    trackLength: number | null;
    venueFirstSeason: number | null;

    fastestLapTime: string | null;
    fastestLapDriver: string | null;
    fastestLapTeam: string | null;

    trackImageUrl: string | null;
    flagImageUrl: string | null;

    sessions: F1ScheduleSession[];
};

/* ================================
   CONSTANTS
================================ */

const F1_CDN_BASE =
    'https://media.formula1.com/image/upload/v1773253094/common/f1';

/* ================================
   HELPERS
================================ */

const parseNumber = (
    value: string | number | null | undefined,
): number | null => {
    if (!value && value !== 0) return null;
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
};

const parseNullableString = (
    value: string | null | undefined,
): string | null => {
    if (!value || value === '0') return null;
    return value;
};

const toBoolean = (value: number | null | undefined): boolean | null => {
    if (value === null || value === undefined) return null;
    return value === 1;
};

const toCurrentBoolean = (value: number | null | undefined): boolean | null => {
    if (value === null || value === undefined) return null;
    return value === 1 || value === 2;
};

const sortSessions = <T extends { startDate: string }>(sessions: T[]) =>
    [...sessions].sort(
        (a, b) =>
            new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );

/* ================================
   IMAGE HELPERS
================================ */

const normalizeCountry = (country: string) => country.replace(/\s+/g, '');

const COUNTRY_TO_FLAG: Record<string, string> = {
    Japan: 'jap',
    Australia: 'aus',
    China: 'chn',
    Bahrain: 'bhr',
    SaudiArabia: 'ksa',
    USA: 'usa',
    Italy: 'ita',
    Spain: 'esp',
    Monaco: 'mco',
    Canada: 'can',
    Austria: 'aut',
    UK: 'gbr',
    Hungary: 'hun',
    Belgium: 'bel',
    Netherlands: 'nld',
    Azerbaijan: 'aze',
    Singapore: 'sgp',
    Mexico: 'mex',
    Brazil: 'bra',
    Qatar: 'qat',
    UAE: 'uae',
};

export const getTrackImageUrl = (
    circuitShortName?: string | null,
    season = 2026,
) => {
    if (!circuitShortName) return null;

    return `${F1_CDN_BASE}/${season}/track/${season}track${circuitShortName.toLowerCase()}.png`;
};

export const getFlagImageUrl = (countryName?: string | null) => {
    if (!countryName) return null;

    const key = normalizeCountry(countryName);
    const code = COUNTRY_TO_FLAG[key];

    if (!code) return null;

    return `${F1_CDN_BASE}/flag/flag${code}.png`;
};

/* ================================
   SESSION MAPPERS
================================ */

export const mapFixtureToSession = (
    fixture: F1FantasyFixture,
): F1ScheduleSession => ({
    id: fixture.RaceId,
    meetingId: fixture.MeetingId,
    meetingNumber: fixture.MeetingNumber,

    sessionName: fixture.SessionName,
    sessionType: fixture.SessionType,
    sessionNumber: parseNumber(fixture.SessionNumber),

    startDate: fixture.SessionStartDateISO8601,
    endDate: fixture.SessionEndDateISO8601,

    fomMeetingSessionKey: parseNumber(fixture.FOMMEETINGSESSIONKEY),

    matchdayId: fixture.GamedayId,
    matchdayName: fixture.MatchdayName,
    raceDay: fixture.RaceDay,

    isLocked: toBoolean(fixture.GDIsLocked),
    isCurrent: toCurrentBoolean(fixture.GDIsCurrent),
    isLive: toCurrentBoolean(fixture.IsLive),
    isLeaderboardShow: toBoolean(fixture.IsLeaderboardShow),
    isActiveForNewUser: toBoolean(fixture.IsActiveForNewUser),
    isPostponed: toBoolean(fixture.IsPostponed),

    nextMatchDeadline: parseNullableString(fixture.NextMatchDeadline),

    source: 'fixture',
});

export const mapCircuitSession = (
    session: F1FantasyCircuitSession,
    meetingId: number,
    meetingNumber: number,
): F1ScheduleSession => ({
    id: session.id,
    meetingId,
    meetingNumber,

    sessionName: session.sessionName,
    sessionType: session.sessionType,
    sessionNumber: session.sessionNumber,

    startDate: session.sessionStartDateIso8601,
    endDate: session.sessionEndDateIso8601,

    fomMeetingSessionKey: session.fomMeetingSessionKey,

    matchdayId: null,
    matchdayName: null,
    raceDay: null,

    isLocked: null,
    isCurrent: null,
    isLive: null,
    isLeaderboardShow: null,
    isActiveForNewUser: null,
    isPostponed: null,

    nextMatchDeadline: null,

    source: 'circuit',
});

/* ================================
   MEETING MAPPERS
================================ */

export const mapCircuitToMeeting = (
    circuit: F1FantasyCircuit,
): F1ScheduleMeeting => ({
    meetingId: circuit.MeetingId,
    meetingNumber: circuit.MeetingNumber,

    meetingName: circuit.MeetingName,
    meetingOfficialName: circuit.MeetingOfficialName,
    meetingLocation: circuit.MeetingLocation,
    circuitLocation: circuit.CircuitLocation,
    circuitOfficialName: circuit.CircuitOfficialName,
    circuitShortName: circuit.CircuitShortName || null,

    countryId: null,
    countryName: null,

    scheduledLapCount: parseNumber(circuit.ScheduledLapCount),
    scheduledDistance: parseNumber(circuit.ScheduledDistance),
    trackLength: parseNumber(circuit.TrackLength),
    venueFirstSeason: parseNumber(circuit.VenueFirstSeason),

    fastestLapTime: parseNullableString(circuit.FastestLapTime),
    fastestLapDriver: parseNullableString(circuit.FastestLapDriver),
    fastestLapTeam: parseNullableString(circuit.FastestLapTeam),

    trackImageUrl: getTrackImageUrl(circuit.CircuitShortName),
    flagImageUrl: null,

    sessions: sortSessions(
        circuit.MeetingSessions.map((s) =>
            mapCircuitSession(s, circuit.MeetingId, circuit.MeetingNumber),
        ),
    ),
});

export const mergeFixtureIntoMeeting = (
    meeting: F1ScheduleMeeting | undefined,
    fixture: F1FantasyFixture,
): F1ScheduleMeeting => {
    const session = mapFixtureToSession(fixture);

    if (!meeting) {
        return {
            meetingId: fixture.MeetingId,
            meetingNumber: fixture.MeetingNumber,

            meetingName: fixture.MeetingName,
            meetingOfficialName: fixture.MeetingOfficialName,
            meetingLocation: fixture.MeetingLocation,
            circuitLocation: fixture.CircuitLocation,
            circuitOfficialName: fixture.CircuitOfficialName,
            circuitShortName: null,

            countryId: parseNumber(fixture.CountryId),
            countryName: fixture.CountryName,

            scheduledLapCount: null,
            scheduledDistance: null,
            trackLength: null,
            venueFirstSeason: null,

            fastestLapTime: null,
            fastestLapDriver: null,
            fastestLapTeam: null,

            trackImageUrl: null,
            flagImageUrl: getFlagImageUrl(fixture.CountryName),

            sessions: [session],
        };
    }

    return {
        ...meeting,
        meetingNumber: fixture.MeetingNumber,
        countryId: meeting.countryId ?? parseNumber(fixture.CountryId),
        countryName: meeting.countryName ?? fixture.CountryName,
        flagImageUrl:
            meeting.flagImageUrl ?? getFlagImageUrl(fixture.CountryName),
        sessions: sortSessions([...meeting.sessions, session]),
    };
};

/* ================================
   DEDUPE
================================ */

export const dedupeSessions = (
    sessions: F1ScheduleSession[],
): F1ScheduleSession[] => {
    const map = new Map<string, F1ScheduleSession>();

    for (const s of sessions) {
        const key = [
            s.meetingId,
            s.fomMeetingSessionKey ?? 'no-key',
            s.sessionName,
            s.startDate,
        ].join('_');

        const existing = map.get(key);

        if (!existing) {
            map.set(key, s);
            continue;
        }

        if (existing.source === 'circuit' && s.source === 'fixture') {
            map.set(key, { ...existing, ...s });
        }
    }

    return sortSessions([...map.values()]);
};

/* ================================
   MAIN
================================ */

export const mapF1ScheduleResponse = (
    data: F1FantasyScheduleResponse,
): F1ScheduleMeeting[] => {
    const map = new Map<number, F1ScheduleMeeting>();

    for (const circuit of data.Data.circuit) {
        map.set(circuit.MeetingId, mapCircuitToMeeting(circuit));
    }

    for (const fixture of data.Data.fixtures) {
        const existing = map.get(fixture.MeetingId);
        map.set(fixture.MeetingId, mergeFixtureIntoMeeting(existing, fixture));
    }

    return [...map.values()]
        .map((m) => ({
            ...m,
            sessions: dedupeSessions(m.sessions),
        }))
        .sort((a, b) => a.meetingNumber - b.meetingNumber);
};
