import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteItem } from '@/lib/actions/delete-item';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function DeleteAlertDialog({ itemId }: { itemId: string }) {
  const router = useRouter();
  const handleDelete = async () => {
    const response = await deleteItem(itemId);
    if (response.success) {
      toast.success(
        <h1 className="text-lg font-bold">Item Deleted</h1>,
        {
          description: 'Item deleted successfully',
          duration: 4000,
        },
      );
      router.refresh();
    } else if (response.error) {
      toast.error(
        <h1 className="text-lg font-bold">Error Occured</h1>,
        {
          description: 'Item could not be deleted. Please try again',
          duration: 4000,
        },
      );
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger
        asChild
        className="font-normal text-left justify-start rounded-sm px-2 py-0"
      >
        <Button
          variant="ghost"
          className="text-left w-full text-destructive hover:text-destructive"
          size={'sm'}
        >
          Delete Item
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you wanna delete?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this item
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
