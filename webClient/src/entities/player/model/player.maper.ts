import type {
    PlayerPositionNameType,
    PlayerResponse,
} from '../api/players-list-response.types';
import type { Player, PlayerPreview } from './types/player.type';

import {
    getConstructorImageRightUrl,
    getDriverFrontImageUrl,
} from './player.assets';
import type { PlayersListView } from './types/players-list-view.type';

export const mapPlayer = (asset: PlayerResponse): Player => {
    return {
        id: asset.PlayerId,
        displayName: asset.DisplayName,
        positionName: asset.PositionName as PlayerPositionNameType,
        teamName: asset.TeamName || '—',
        price: Number(asset.Value),
        points: Number(asset.OverallPpints),
        selectedPercent: Number(asset.SelectedPercentage),
        valueForMoney: asset.AdditionalStats.value_for_money,
        overtakingPts: asset.AdditionalStats.overtaking_pts,
    };
};

const mapPlayerToPreview = (asset: PlayerResponse): PlayerPreview => {
    const imageUrl =
        asset.PositionName === 'DRIVER'
            ? getDriverFrontImageUrl(asset)
            : getConstructorImageRightUrl(asset);

    return {
        id: asset.PlayerId,
        name: asset.DisplayName,

        shortName: asset.DisplayName,

        imageUrl,

        teamName: asset.TeamName || asset.DisplayName,
        positionName: asset.PositionName as PlayerPositionNameType,
        value: Number(asset.Value),
        valueChange: Number(asset.new_value) - Number(asset.old_Value),
        overallPoints: Number(asset.OverallPpints),
        gamedayPoints: Number(asset.GamedayPoints),
        selectedPercentage: Number(asset.SelectedPercentage),
        isActive: asset.IsActive === '1',
        status: asset.Status,
    };
};

export const mapPlayers = (assets: PlayerResponse[]): PlayersListView => {
    return {
        table: assets.map(mapPlayer),
        preview: assets.map(mapPlayerToPreview),
    };
};
