import { X } from 'lucide-react';

import { IconButton } from '@/shared/ui';

import { PlayerAvatar, type Player } from '@/entities/player';
import { usePlayerStatsQuery } from '@/entities/player-stats';

type PricePredictionProps = {
    player: Player;
    onRemove: () => void;
};

export const PricePrediction = ({ player, onRemove }: PricePredictionProps) => {
    const { data } = usePlayerStatsQuery({
        playerId: player?.id,
    });
    const priceChanges =
        player.price < 18.5 ? [0.6, 0.2, -0.2, -0.6] : [0.3, 0.1, -0.1, -0.3];

    const recentActiveRaces = [...(data?.Value.GamedayWiseStats ?? [])]
        .filter((race) => race.IsActive === 1 && race.IsPlayed === 1)
        .sort((a, b) => b.GamedayId - a.GamedayId)
        .slice(0, 2);

    const recentPoints = recentActiveRaces.reduce(
        (sum, race) =>
            sum +
            (race.StatsWise.find((stat) => stat.Event === 'Total')?.Value ?? 0),
        0,
    );

    const requiredPoints = (coefficient: number) =>
        3 * player.price * coefficient - recentPoints;

    // Remove floating-point noise before rounding to whole fantasy points.
    const minimumPoints = (coefficient: number) =>
        `(${Math.ceil(Number(requiredPoints(coefficient).toFixed(8)))})`;

    const maximumPoints = (coefficient: number) =>
        `(${Math.floor(Number(requiredPoints(coefficient).toFixed(8)))})`;

    const pointsRange = (lower: number, upper: number) => {
        const minimum = minimumPoints(lower);
        const maximum = maximumPoints(upper);
        return `${minimum} – ${maximum}`;
    };
    const pointTargets = [
        `≥ ${minimumPoints(1.195)}`,
        pointsRange(0.9, 1.194),
        pointsRange(0.605, 0.899),
        `≤ ${maximumPoints(0.604)}`,
    ];

    return (
        <div className="flex flex-col gap-4 rounded-lg border border-border p-4">
            <header className="flex items-center gap-3">
                <PlayerAvatar
                    playerId={player.id}
                    avatarImageUrl={player.avatarImageUrl}
                    name={player.displayName}
                />
                <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-semibold">
                        {player.displayName}
                    </h2>
                    <p className="text-sm text-muted-fg">
                        {player.teamName === '—'
                            ? player.displayName
                            : player.teamName}{' '}
                        · ${player.price.toFixed(1)}M
                    </p>
                </div>
                <IconButton
                    icon={<X size={18} />}
                    aria-label={`Remove ${player.displayName} from selection`}
                    onClick={onRemove}
                />
            </header>

            {data && (
                <table className="w-full table-fixed border-collapse text-center">
                    <caption className="mb-3 text-left text-sm text-muted-fg">
                        Points needed next race week
                    </caption>
                    <thead>
                        <tr>
                            {priceChanges.map((change) => (
                                <th
                                    key={change}
                                    className="border border-border p-3 font-medium"
                                    scope="col"
                                >
                                    {change > 0 ? '+' : ''}
                                    {change.toFixed(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {priceChanges.map((change, index) => (
                                <td
                                    key={change}
                                    className="border border-border p-3 text-muted-fg"
                                >
                                    {pointTargets[index]}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};
