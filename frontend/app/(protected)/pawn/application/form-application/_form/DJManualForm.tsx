// Global
// ...
// Data dummy
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DJProductChar } from "./_DJManual/DJProductChar";
import { DJDesign } from "./_DJManual/DJDesign";
import { DJStone } from "./_DJManual/DJStone";
import { DJFinish } from "./_DJManual/DJFinish";

export function DJModalManual() {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value="productChar">Product Char</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="stone">Stone</TabsTrigger>
        <TabsTrigger value="finish">Finish</TabsTrigger>
      </TabsList>

      {/* Isi tiap tab */}
      <TabsContent value="productChar" keepMounted>
        <DJProductChar />
      </TabsContent>
      <TabsContent value="design" keepMounted>
        <DJDesign />
      </TabsContent>
      <TabsContent value="stone" keepMounted>
        <DJStone />
      </TabsContent>
      <TabsContent value="finish" keepMounted>
        <DJFinish />
      </TabsContent>
    </Tabs>
  )
}