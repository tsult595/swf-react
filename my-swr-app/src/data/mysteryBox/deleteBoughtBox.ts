const API_URL = '/api/mystery-boxes';

export async function deleteBoughtBox(userId: string, boxId: number): Promise<void> {
    try {
        const res = await fetch(`${API_URL}/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, boxId })
        });
        if (!res.ok) throw new Error('Failed to delete bought box');
    } catch (error) {
        console.error('Error deleting bought box:', error);
        throw error;
    }
}