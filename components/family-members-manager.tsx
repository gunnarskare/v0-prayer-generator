"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Heart, Users, UserPlus } from "lucide-react"

type MemberType = "spouse" | "son" | "daughter" | "friend"

interface FamilyMember {
  id: string
  type: MemberType
  name: string
  sort_order: number
}

const typeLabels: Record<MemberType, string> = {
  spouse: "Ektefelle",
  son: "Sønn",
  daughter: "Datter",
  friend: "Venn",
}

const typeIcons: Record<MemberType, string> = {
  spouse: "💑",
  son: "👦",
  daughter: "👧",
  friend: "🤝",
}

interface FamilyMembersManagerProps {
  onMembersChange?: (members: FamilyMember[]) => void
  compact?: boolean
}

export function FamilyMembersManager({ onMembersChange, compact = false }: FamilyMembersManagerProps) {
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState<MemberType>("son")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    loadMembers()
  }, [])

  useEffect(() => {
    onMembersChange?.(members)
  }, [members, onMembersChange])

  async function loadMembers() {
    const { data, error } = await supabase
      .from("family_members")
      .select("*")
      .order("sort_order", { ascending: true })

    if (!error && data) {
      setMembers(data)
    }
    setLoading(false)
  }

  async function addMember() {
    if (!newName.trim()) return
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setSaving(false)
      return
    }

    const { data, error } = await supabase
      .from("family_members")
      .insert({
        user_id: user.id,
        type: newType,
        name: newName.trim(),
        sort_order: members.length,
      })
      .select()
      .single()

    if (!error && data) {
      setMembers([...members, data])
      setNewName("")
    }
    setSaving(false)
  }

  async function removeMember(id: string) {
    const { error } = await supabase
      .from("family_members")
      .delete()
      .eq("id", id)

    if (!error) {
      setMembers(members.filter((m) => m.id !== id))
    }
  }

  const spouse = members.find((m) => m.type === "spouse")
  const children = members.filter((m) => m.type === "son" || m.type === "daughter")
  const friends = members.filter((m) => m.type === "friend")

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    )
  }

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Current members summary */}
        <div className="flex flex-wrap gap-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm"
            >
              <span>{typeIcons[member.type]}</span>
              <span>{member.name}</span>
              <button
                onClick={() => removeMember(member.id)}
                className="ml-1 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
          {members.length === 0 && (
            <p className="text-sm text-muted-foreground">Ingen familiemedlemmer lagt til</p>
          )}
        </div>

        {/* Add new */}
        <div className="flex gap-2">
          <Select value={newType} onValueChange={(v) => setNewType(v as MemberType)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {!spouse && <SelectItem value="spouse">Ektefelle</SelectItem>}
              <SelectItem value="son">Sønn</SelectItem>
              <SelectItem value="daughter">Datter</SelectItem>
              <SelectItem value="friend">Venn</SelectItem>
            </SelectContent>
          </Select>
          <Input
            placeholder="Navn"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addMember()}
            className="flex-1"
          />
          <Button onClick={addMember} disabled={saving || !newName.trim()} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Mine familiemedlemmer og venner
        </CardTitle>
        <CardDescription>
          Legg til personer som skal kunne inkluderes i dine bønner
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Spouse */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Heart className="h-4 w-4 text-rose-500" />
            Ektefelle
          </Label>
          {spouse ? (
            <div className="flex items-center justify-between rounded-lg border bg-card p-3">
              <span className="font-medium">{spouse.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeMember(spouse.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Input
                placeholder="Ektefellens navn"
                value={newType === "spouse" ? newName : ""}
                onChange={(e) => {
                  setNewType("spouse")
                  setNewName(e.target.value)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newType === "spouse") addMember()
                }}
              />
              <Button
                onClick={() => {
                  if (newType === "spouse") addMember()
                }}
                disabled={saving || newType !== "spouse" || !newName.trim()}
              >
                <Plus className="mr-2 h-4 w-4" />
                Legg til
              </Button>
            </div>
          )}
        </div>

        {/* Children */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4 text-blue-500" />
            Barn ({children.length})
          </Label>
          <div className="space-y-2">
            {children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between rounded-lg border bg-card p-3"
              >
                <span>
                  <span className="mr-2">{typeIcons[child.type]}</span>
                  <span className="font-medium">{child.name}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({typeLabels[child.type]})
                  </span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(child.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Select
              value={newType === "son" || newType === "daughter" ? newType : "son"}
              onValueChange={(v) => setNewType(v as MemberType)}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="son">Sønn</SelectItem>
                <SelectItem value="daughter">Datter</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Barnets navn"
              value={newType === "son" || newType === "daughter" ? newName : ""}
              onChange={(e) => {
                if (newType !== "son" && newType !== "daughter") setNewType("son")
                setNewName(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (newType === "son" || newType === "daughter")) addMember()
              }}
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (newType === "son" || newType === "daughter") addMember()
              }}
              disabled={saving || (newType !== "son" && newType !== "daughter") || !newName.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Legg til
            </Button>
          </div>
        </div>

        {/* Friends */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-sm font-medium">
            <UserPlus className="h-4 w-4 text-green-500" />
            Venner ({friends.length})
          </Label>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend.id}
                className="flex items-center justify-between rounded-lg border bg-card p-3"
              >
                <span className="font-medium">{friend.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMember(friend.id)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Vennens navn"
              value={newType === "friend" ? newName : ""}
              onChange={(e) => {
                setNewType("friend")
                setNewName(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newType === "friend") addMember()
              }}
              className="flex-1"
            />
            <Button
              onClick={() => {
                if (newType === "friend") addMember()
              }}
              disabled={saving || newType !== "friend" || !newName.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Legg til
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
