import { type FunctionComponent, useCallback, useRef, useState } from 'react';
import { BryntumGantt, type BryntumGanttProps } from '@bryntum/gantt-react-enterprise';
import CustomTaskModel from './lib/CustomTaskModel';
import AssigneeBadge from './AssigneeBadge';
import AssigneeToggle from './AssigneeToggle';
import './App.css';

const App: FunctionComponent = () => {
    const gantt = useRef<BryntumGantt>(null);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const toggleMember = useCallback((name: string) => {
        setSelectedMembers((prev) =>
            prev.includes(name) ? prev.filter((m) => m !== name) : [...prev, name]
        );
    }, []);

    // The gantt config is created once via useState.
    // The renderer captures the initial selectedMembers value ([]).
    // When selectedMembers changes in the dashboard, the renderer
    // is NOT re-executed by Bryntum — so AssigneeBadge always
    // receives the stale initial value.
    const [ganttProps] = useState<BryntumGanttProps>({
        startDate  : new Date(2026, 10, 1),
        endDate    : new Date(2026, 11, 1),
        viewPreset : 'weekAndDayLetter',
        barMargin  : 10,

        columns : [
            { type : 'name', field : 'name', width : 300 },
            {
                text     : 'Assignee',
                field    : 'assignee',
                width    : 140,
                renderer : ({ record }: { record: { get: (field: string) => string } }) => {
                    const assignee = record.get('assignee');
                    if (!assignee) return null;
                    return (
                        <AssigneeBadge
                            assignee={assignee}
                            selectedMembers={selectedMembers}
                        />
                    );
                }
            }
        ],

        project : {
            taskModelClass : CustomTaskModel,
            transport      : {
                load : {
                    url : 'data/data.json'
                }
            },
            autoLoad           : true,
            autoSetConstraints : true
        }
    });

    return (
        <div style={{ display : 'flex', flexDirection : 'column', height : '100vh' }}>
            <AssigneeToggle
                selectedMembers={selectedMembers}
                onToggleMember={toggleMember}
            />
            <div style={{ flex : 1 }}>
                <BryntumGantt ref={gantt} {...ganttProps} />
            </div>
        </div>
    );
};

export default App;
