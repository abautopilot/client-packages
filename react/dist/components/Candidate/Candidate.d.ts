import { default as React } from 'react';
interface CandidateProps {
    id: string;
    copy: string;
    seenCount: number;
    clickedCount: number;
    experimentId: string;
}
export default function Candidate(props: CandidateProps): React.ReactElement;
export {};
