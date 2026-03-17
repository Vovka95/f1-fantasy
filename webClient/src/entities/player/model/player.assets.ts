import type { PlayerResponse } from '../api/players-list-response.types';

export const teamBackgroundColorMap: Record<string, string> = {
    mercedes: 'b_rgb:00d7b6',
    redbullracing: 'b_rgb:6c98ff',
    mclaren: 'b_rgb:f47600',
    ferrari: 'b_rgb:ed1131',
    alpine: 'b_rgb:00a1e8',
    williams: 'b_rgb:1868db',
    astonmartin: 'b_rgb:229971',
    haasf1team: 'b_rgb:9c9fa2',
    racingbulls: 'b_rgb:4781D7',
    audi: 'b_rgb:F50537',
    cadillac: 'b_rgb:909090',
};

export const getTeamBackgroundColor = (teamName: string) => {
    return teamBackgroundColorMap[teamName] ?? '000000';
};

const normalizeString = (str: string) => str.replace(/\s/g, '').toLowerCase();

export const getDriverFrontImageUrl = (asset: PlayerResponse) => {
    const year = 2026;
    const teamSlug = normalizeString(asset.TeamName);
    const driverSlug = normalizeString(asset.DriverReference);
    const bgColor = getTeamBackgroundColor(teamSlug);

    return `https://media.formula1.com/image/upload/ar_16:9,c_crop,g_north/${bgColor}/v1772802140/common/f1/${year}/${teamSlug}/${driverSlug}/${year}${teamSlug}${driverSlug}front.png`;
};

export const getConstructorImageRightUrl = (asset: PlayerResponse) => {
    const year = 2026;
    const teamSlug = normalizeString(asset.DisplayName);
    const bgColor = getTeamBackgroundColor(teamSlug);

    return `https://media.formula1.com/image/upload/c_scale,w_2000/c_lpad,h_900,w_2100/${bgColor}/v1772802140/common/f1/${year}/${teamSlug}/${year}${teamSlug}carright.png`;
};
