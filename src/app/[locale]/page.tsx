"use client";

import LanguageSelector from "@components/custom/LanguageSelector";
import LoginForm from "@components/custom/LoginForm";
import { AdvancedMarker, APIProvider, Map } from "@vis.gl/react-google-maps";
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
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const t = useTranslations("frontpage");

  return (
    <>
      <div className="fixed top-4 left-4 z-50">
        <LanguageSelector />
      </div>
      <div className="flex h-screen w-full items-stretch justify-center background">
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
            <CarouselPrevious className="ml-8" />
            <CarouselNext className="mr-8" />
          </Carousel>
        </div>

        <div className="w-2/5 pt-4 flex flex-col items-center bg-primary text-black">
          <div className="w-full h-3/5 justify-start max-w-sm p-2 rounded-lg items-center overflow-y-auto">
            <div className="flex flex-col items-center">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={110}
                height={110}
                className="rounded-lg shadow-2xl mb-4 p-2 bg-white"
              />
            </div>
            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="account">
                  {t("loginForm.loginTab")}
                </TabsTrigger>
                <TabsTrigger value="password">
                  {t("loginForm.signUpTab")}
                </TabsTrigger>
              </TabsList>
              <TabsContent value="account">
                <LoginForm />
              </TabsContent>
              <TabsContent value="password">
                {/* TODO create signup form */}
              </TabsContent>
            </Tabs>
          </div>
          <div className="h-2/5 w-full flex flex-col justify-center items-center ">
            <div>
              <h1 className="text-lg font-bold text-center mb-4">
                {t("map.title")}
              </h1>
            </div>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
              <Map
                style={{
                  width: "30vw",
                  height: "30vh",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  marginBottom: "1rem",
                }}
                defaultCenter={{
                  lat: 38.05549193859103,
                  lng: -1.217749291324227,
                }}
                defaultZoom={15}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID}
                mapTypeId="terrain"
              >
                <AdvancedMarker
                  position={{ lat: 38.05549193859103, lng: -1.217749291324227 }}
                />
              </Map>
            </APIProvider>
          </div>
        </div>
      </div>
    </>
  );
}
