import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Symptom } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

type SymptomHistoryTableProps = {
  symptoms: Symptom[];
};

export function SymptomHistoryTable({ symptoms }: SymptomHistoryTableProps) {
  const getSeverityBadgeVariant = (severity: Symptom['severity']) => {
    switch (severity) {
      case 'Severe':
        return 'destructive';
      case 'Moderate':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Symptom</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead className="text-right">Logged</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {symptoms.map((symptom) => (
          <TableRow key={symptom.id}>
            <TableCell className="font-medium">{symptom.symptomLabel}</TableCell>
            <TableCell>
              <Badge variant={getSeverityBadgeVariant(symptom.severity)}>
                {symptom.severity}
              </Badge>
            </TableCell>
            <TableCell className="text-right text-muted-foreground text-xs">
              {formatDistanceToNow(new Date(symptom.timestamp), { addSuffix: true })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
