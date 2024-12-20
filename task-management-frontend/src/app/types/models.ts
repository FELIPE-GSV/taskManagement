type Task = {
    identifier?: string;
    title: string;
    description?: string | null;
    created_at?: string;
    updated_at?: string;
    due_date?: string | null;
    finish_at?: string | null;
    completed?: boolean;
    user: number;
};
