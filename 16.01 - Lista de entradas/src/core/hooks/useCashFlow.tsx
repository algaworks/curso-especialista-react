import { CashFlow, CashFlowService } from 'danielbonifacio-sdk';
import { useCallback } from 'react';
import { useState } from 'react';

export default function useCashFlow() {
  const [entries, setEntries] = useState<CashFlow.EntrySummary[]>([]);

  const [fetchingEntries, setFetchingEntries] = useState(false);

  const fetchEntries = useCallback(async (query: CashFlow.Query) => {
    try {
      setFetchingEntries(true);
      const newEntries = await CashFlowService.getAllEntries(query);
      setEntries(newEntries);
    } finally {
      setFetchingEntries(false);
    }
  }, []);

  return {
    entries,
    fetchingEntries,
    fetchEntries,
  };
}
