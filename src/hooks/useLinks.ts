import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Link {
  id: string;
  user_id: string;
  title: string;
  url: string;
  icon: string;
  is_active: boolean;
  clicks: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export const useLinks = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLinks();
    } else {
      setLinks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setLinks(data);
    }
    setLoading(false);
  };

  const addLink = async (link: { title: string; url: string }) => {
    if (!user) return { error: new Error("Not authenticated") };

    const newLink = {
      user_id: user.id,
      title: link.title,
      url: link.url,
      sort_order: links.length,
    };

    const { data, error } = await supabase
      .from("links")
      .insert(newLink)
      .select()
      .single();

    if (!error && data) {
      setLinks(prev => [...prev, data]);
    }

    return { error, data };
  };

  const updateLink = async (id: string, updates: Partial<Link>) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("links")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setLinks(prev => prev.map(link => 
        link.id === id ? { ...link, ...updates } : link
      ));
    }

    return { error };
  };

  const deleteLink = async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("links")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setLinks(prev => prev.filter(link => link.id !== id));
    }

    return { error };
  };

  const toggleLink = async (id: string) => {
    const link = links.find(l => l.id === id);
    if (link) {
      return updateLink(id, { is_active: !link.is_active });
    }
    return { error: new Error("Link not found") };
  };

  return { links, loading, addLink, updateLink, deleteLink, toggleLink, refetch: fetchLinks };
};

export const useLinksByUserId = (userId: string) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchLinks();
    }
  }, [userId]);

  const fetchLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", userId)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (!error && data) {
      setLinks(data);
    }
    setLoading(false);
  };

  const incrementClick = async (linkId: string) => {
    const link = links.find(l => l.id === linkId);
    if (link) {
      await supabase
        .from("links")
        .update({ clicks: link.clicks + 1 })
        .eq("id", linkId);
    }
  };

  return { links, loading, incrementClick };
};
