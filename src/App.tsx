import { zodResolver } from "@hookform/resolvers/zod";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import Autocomplete from "./components/custom/AutoComplete";
import Header from "./components/layout/Header";
import { Form, FormField, FormItem, FormMessage } from "./components/ui/form";

const queryClient = new QueryClient();

const FormScheme = z.object({
  city: z.string().min(2, "City name must be at least 2 characters"),
});

type FormSchemeType = z.infer<typeof FormScheme>;

export default function App() {
  const form = useForm<FormSchemeType>({
    resolver: zodResolver(FormScheme),
    defaultValues: {
      city: "",
    },
  });

  const onSubmit = (data: FormSchemeType) => {
    console.log(data);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="wrapper px-4 sm:px-6">
        <Header />
        <h1 className="span-full my-8 text-center text-preset-2 tracking-wide">
          How&rsquo;s the sky looking today?
        </h1>
        <div className="span-full flex-center">
          <Form {...form}>
            <form
              className="flex flex-col gap-x-4 gap-y-3 max-md:w-full sm:flex-row"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Autocomplete
                      onChange={field.onChange}
                      value={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </QueryClientProvider>
  );
}
