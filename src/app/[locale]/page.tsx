"use client";

import LanguageSelector from "@components/custom/LanguageSelector";
import LoginForm from "@components/custom/LoginForm";
import { Map } from "lucide-react";
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
import SignUpForm from "@components/custom/SignUpForm";
import { Button } from "@components/shadcn/ui/button";
import { useState, useEffect } from "react";
import ImpactMap from "@components/custom/Map";

export default function Home() {
  const t = useTranslations("frontpage");
  const [showMap, setShowMap] = useState(false);
  const [renderMapModalContent, setRenderMapModalContent] = useState(false);

  useEffect(() => {
    if (showMap) {
      setRenderMapModalContent(true);
    } else {
      const timer = setTimeout(() => {
        setRenderMapModalContent(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showMap]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
                   transition-opacity duration-500 ease-in-out
                   ${
                     showMap ? "opacity-100" : "opacity-0 pointer-events-none"
                   }`}
        onClick={() => setShowMap(false)}
      >
        <div
          className={`relative rounded-lg max-w-3xl w-11/12 md:w-full
                     transform transition-all duration-500 ease-in-out
                     ${showMap ? "opacity-100" : "opacity-0"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {renderMapModalContent && <ImpactMap />}
        </div>
      </div>

      <div className="fixed top-4 left-4 z-50">
        <LanguageSelector />
      </div>
      <div
        className={`flex h-screen w-full items-stretch justify-center background 
                   transition-[filter,backdrop-filter] duration-300 ease-in-out ${
                     showMap ? "blur-sm backdrop-blur-sm" : ""
                   }`}
      >
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
          <div className="w-full h-9/10 justify-start max-w-sm p-2 rounded-lg items-center overflow-y-auto">
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
                <SignUpForm />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full h-1/10 flex justify-center items-center mt-4">
            <Button
              className="bg-background text-foreground"
              onClick={() => setShowMap(true)}
            >
              <Map className="mr-1" />
              {t("map.button")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
