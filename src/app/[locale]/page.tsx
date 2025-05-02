import LanguageSelector from "@components/custom/LanguageSelector";
import LoginForm from "@components/custom/LoginForm";
import { Card, CardContent } from "@components/shadcn/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/shadcn/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/shadcn/ui/tabs";
import { useTranslations } from "next-intl"; // Import the hook

export default function Home() {
  const t = useTranslations("frontpage"); // Initialize the hook

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <LanguageSelector />
      </div>
      {/* Ensure the main container takes full height */}
      <div className="flex h-screen w-full items-stretch justify-center background">
        {/* Left section (Carousel) */}
        <div className="w-3/5 p-4 m-8 flex flex-col">
          <Carousel
            className="w-full h-full grow"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="h-[80vh] flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem key={index} className="h-3/5 flex"></CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-8"/>
            <CarouselNext className="mr-8"/>
          </Carousel>
        </div>

        <div className="w-2/5 p-4 flex flex-col justify-center items-center bg-primary text-black">
          <div className="w-full max-w-sm p-8 rounded-lg items-center">
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                {/* Corrected translation key */}
                <TabsTrigger value="account">{t('LoginForm.loginTab')}</TabsTrigger>
                <TabsTrigger value="password">{t('LoginForm.signUpTab')}</TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <LoginForm />
              </TabsContent>
              <TabsContent value="password">
                 {/* Use translation for placeholder text */}
                <p>{t('LoginForm.signUpPlaceholder')}</p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}