
import { Label } from "@/components/ui/label";

interface Technician {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
}

interface TaskTechnicianSelectionProps {
  technicians: Technician[];
  selectedTechs: string[];
  handleTechnicianSelection: (techId: string) => void;
}

const TaskTechnicianSelection = ({
  technicians,
  selectedTechs,
  handleTechnicianSelection
}: TaskTechnicianSelectionProps) => {
  return (
    <div className="grid grid-cols-4 items-start gap-4">
      <Label className="text-right pt-2">Assign To</Label>
      <div className="col-span-3 border rounded-md p-3 space-y-2 max-h-[200px] overflow-y-auto">
        <p className="text-sm text-muted-foreground mb-2">
          Select one or more technicians to assign this task to:
        </p>
        {technicians.map((tech) => (
          <div key={tech.id} className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              id={`tech-${tech.id}`} 
              checked={selectedTechs.includes(tech.id)}
              onChange={() => handleTechnicianSelection(tech.id)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <label htmlFor={`tech-${tech.id}`} className="text-sm">
              {tech.first_name} {tech.last_name} 
              {tech.role === "contractor" ? " (Contractor)" : " (In-house)"}
            </label>
          </div>
        ))}
        {technicians.length === 0 && (
          <p className="text-sm text-muted-foreground">No technicians available</p>
        )}
      </div>
    </div>
  );
};

export default TaskTechnicianSelection;
