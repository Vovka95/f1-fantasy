import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('f1_session')
export class F1Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    cookieHeader: string;

    @Column({ type: 'boolean', default: true })
    isValid: boolean;

    @Column({ type: 'timestamptz', nullable: true })
    lastValidatedAt: Date | null;

    @Column({ type: 'timestamptz', nullable: true })
    expiredAt: Date | null;

    @Column({ type: 'text', nullable: true })
    lastError: string | null;

    @Column({ type: 'timestamptz', default: () => 'now()' })
    updatedAt: Date;
}
