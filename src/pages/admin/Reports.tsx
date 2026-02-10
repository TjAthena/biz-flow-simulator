import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";

interface Report {
  id: string;
  reportName: string;
  description: string;
  iframeUrl: string;
  assignedCustomer: string;
}

const reportSchema = z.object({
  reportName: z.string().min(1, "Report name is required"),
  description: z.string().optional(),
  iframeUrl: z.string().url("Must be a valid URL"),
  assignedCustomer: z.string().min(1, "Select a customer"),
});

type ReportForm = z.infer<typeof reportSchema>;

const demoCustomers = [
  { id: "1", name: "Jane Smith" },
  { id: "2", name: "Bob Johnson" },
];

const demoReports: Report[] = [
  { id: "1", reportName: "Sales Dashboard Q4", description: "Quarterly sales overview", iframeUrl: "https://app.powerbi.com/view?r=example1", assignedCustomer: "1" },
  { id: "2", reportName: "Marketing Analytics", description: "", iframeUrl: "http://tableau.example.com/view/123", assignedCustomer: "2" },
];

const AdminReports = () => {
  const [reports, setReports] = useState<Report[]>(demoReports);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const { toast } = useToast();

  const form = useForm<ReportForm>({
    resolver: zodResolver(reportSchema),
    defaultValues: { reportName: "", description: "", iframeUrl: "", assignedCustomer: "" },
  });

  const iframeUrl = form.watch("iframeUrl");
  const isHttpWarning = iframeUrl && iframeUrl.startsWith("http://");

  const openCreate = () => {
    setEditingReport(null);
    form.reset({ reportName: "", description: "", iframeUrl: "", assignedCustomer: "" });
    setDialogOpen(true);
  };

  const openEdit = (report: Report) => {
    setEditingReport(report);
    form.reset({
      reportName: report.reportName,
      description: report.description,
      iframeUrl: report.iframeUrl,
      assignedCustomer: report.assignedCustomer,
    });
    setDialogOpen(true);
  };

  const onSubmit = (data: ReportForm) => {
    if (editingReport) {
      setReports(reports.map(r => r.id === editingReport.id ? { ...editingReport, reportName: data.reportName, iframeUrl: data.iframeUrl, assignedCustomer: data.assignedCustomer, description: data.description || "" } : r));
      toast({ title: "Report updated" });
    } else {
      const newReport: Report = { id: Date.now().toString(), reportName: data.reportName, description: data.description || "", iframeUrl: data.iframeUrl, assignedCustomer: data.assignedCustomer };
      setReports([...reports, newReport]);
      toast({ title: "Report created" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setReports(reports.filter(r => r.id !== id));
    toast({ title: "Report deleted" });
  };

  const getCustomerName = (id: string) => demoCustomers.find(c => c.id === id)?.name || "—";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading font-bold">Reports</h1>
          <p className="text-body text-muted-foreground">Manage dashboards and assign them to customers.</p>
        </div>
        <Button onClick={openCreate}><Plus className="h-4 w-4 mr-1" />Add Report</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned Customer</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.reportName}</TableCell>
                  <TableCell>{r.description || "—"}</TableCell>
                  <TableCell>{getCustomerName(r.assignedCustomer)}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-caption">{r.iframeUrl}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(r)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {reports.length === 0 && (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No reports yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingReport ? "Edit Report" : "Create Report"}</DialogTitle></DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="reportName" render={({ field }) => (
                <FormItem><FormLabel>Report Name *</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="Optional" rows={2} {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={form.control} name="iframeUrl" render={({ field }) => (
                <FormItem>
                  <FormLabel>Embedded iframe URL *</FormLabel>
                  <FormControl><Input placeholder="https://app.powerbi.com/view?r=..." {...field} /></FormControl>
                  <FormMessage />
                  {isHttpWarning && (
                    <div className="flex items-center gap-1.5 text-caption text-destructive mt-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      This URL uses HTTP instead of HTTPS. Consider using a secure URL.
                    </div>
                  )}
                </FormItem>
              )} />
              <FormField control={form.control} name="assignedCustomer" render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign Customer *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select a customer" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {demoCustomers.map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="w-full">{editingReport ? "Save Changes" : "Create Report"}</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReports;
