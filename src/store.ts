import { create } from 'zustand';

interface TeamStore {
    selectedMembers: string[];
    toggleMember: (name: string) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
    selectedMembers : [],
    toggleMember    : (name) =>
        set((state) => ({
            selectedMembers : state.selectedMembers.includes(name)
                ? state.selectedMembers.filter((m) => m !== name)
                : [...state.selectedMembers, name]
        }))
}));
