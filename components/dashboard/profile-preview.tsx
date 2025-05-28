"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Mail, MapPin, Phone, Twitter, Linkedin } from "lucide-react"

interface ProfilePreviewProps {
  profile: {
    name: string
    email: string
    role: string
    bio: string
    institution: string
    department: string
    position: string
    phone: string
    location: string
    website: string
    twitter: string
    linkedin: string
  }
  avatarPreview: string | null
}

export function ProfilePreview({ profile, avatarPreview }: ProfilePreviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-primary to-primary/60"></div>
      <div className="relative px-6">
        <Avatar className="h-24 w-24 absolute -top-12 border-4 border-background">
          <AvatarImage src={avatarPreview || "/placeholder.svg?height=96&width=96&query=avatar"} alt={profile.name} />
          <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <CardContent className="pt-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.position}</p>
          </div>
          <Badge className="mt-2 md:mt-0 w-fit" variant="default">
            {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
          </Badge>
        </div>

        <div className="space-y-4">
          <p className="text-sm">{profile.bio}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profile.email}</span>
            </div>
            {profile.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <a
                  href={profile.website}
                  className="text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            )}
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Institution</h3>
            <div className="flex flex-col">
              <span className="font-medium">{profile.institution}</span>
              <span className="text-sm text-muted-foreground">{profile.department}</span>
            </div>
          </div>

          {(profile.twitter || profile.linkedin) && (
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Social Profiles</h3>
              <div className="flex gap-3">
                {profile.twitter && (
                  <a
                    href={`https://twitter.com/${profile.twitter.replace("@", "")}`}
                    className="text-primary hover:text-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={`https://www.${profile.linkedin}`}
                    className="text-primary hover:text-primary/80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
