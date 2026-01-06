import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockJobService } from '@/lib/mockServices';
import { Job } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Briefcase } from 'lucide-react';

const AdminCareers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'full-time' as Job['type'],
    description: '',
    requirements: '',
    active: true,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const jobsData = await mockJobService.getAll();
    setJobs(jobsData);
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'full-time',
      description: '',
      requirements: '',
      active: true,
    });
    setEditingJob(null);
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: job.description,
      requirements: job.requirements.join('\n'),
      active: job.active,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobData = {
      ...formData,
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
    };

    if (editingJob) {
      await mockJobService.update(editingJob.id, jobData);
      toast({ title: 'Job updated successfully' });
    } else {
      await mockJobService.create(jobData);
      toast({ title: 'Job created successfully' });
    }
    
    await loadData();
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    await mockJobService.delete(id);
    await loadData();
    toast({ title: 'Job deleted' });
  };

  const handleToggleActive = async (job: Job) => {
    await mockJobService.update(job.id, { active: !job.active });
    await loadData();
    toast({ title: `Job ${job.active ? 'deactivated' : 'activated'}` });
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48" />
          <div className="h-64 bg-muted rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="page-title">Careers</h1>
          <p className="page-description">Manage job postings</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Job
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingJob ? 'Edit Job' : 'Add New Job'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Employment Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value as Job['type'] })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements (one per line)</Label>
                <Textarea
                  id="requirements"
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                />
                <Label>Active</Label>
              </div>
              <DialogFooter>
                <Button type="submit">{editingJob ? 'Update' : 'Create'} Job</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="status-badge status-pending">{job.type}</span>
                      <button
                        onClick={() => handleToggleActive(job)}
                        className={job.active ? 'status-badge status-success cursor-pointer' : 'status-badge status-error cursor-pointer'}
                      >
                        {job.active ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(job)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3">{job.description}</p>
              {job.requirements.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-medium text-muted-foreground mb-1">Requirements:</p>
                  <ul className="text-xs text-muted-foreground list-disc list-inside">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li>+{job.requirements.length - 3} more</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminCareers;
