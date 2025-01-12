import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon } from "@heroicons/react/24/outline";
import { PageContainer } from "@/components/ui/page-container";

interface ComingSoonProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function ComingSoon({ title, description, icon: Icon = ClockIcon }: ComingSoonProps) {
  return (
    <PageContainer className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16">
            <Icon className="w-full h-full text-gray-400" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 text-sm sm:text-base">{description}</p>
        </CardContent>
      </Card>
    </PageContainer>
  );
} 