import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface SocialLink {
  id: string;
  user_id: string;
  platform: string;
  url: string;
  created_at: string;
}

export const useSocialLinks = () => {
  const { user } = useAuth();
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSocialLinks();
    } else {
      setSocialLinks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSocialLinks = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("user_id", user.id);

    if (!error && data) {
      setSocialLinks(data);
    }
    setLoading(false);
  };

  const addSocialLink = async (platform: string, url: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { data, error } = await supabase
      .from("social_links")
      .insert({ user_id: user.id, platform, url })
      .select()
      .single();

    if (!error && data) {
      setSocialLinks(prev => [...prev, data]);
    }

    return { error, data };
  };

  const updateSocialLink = async (id: string, updates: { platform?: string; url?: string }) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("social_links")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setSocialLinks(prev => prev.map(link => 
        link.id === id ? { ...link, ...updates } : link
      ));
    }

    return { error };
  };

  const deleteSocialLink = async (id: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase
      .from("social_links")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setSocialLinks(prev => prev.filter(link => link.id !== id));
    }

    return { error };
  };

  return { socialLinks, loading, addSocialLink, updateSocialLink, deleteSocialLink, refetch: fetchSocialLinks };
};

export const useSocialLinksByUserId = (userId: string) => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchSocialLinks();
    }
  }, [userId]);

  const fetchSocialLinks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .eq("user_id", userId);

    if (!error && data) {
      setSocialLinks(data);
    }
    setLoading(false);
  };

  return { socialLinks, loading };
};
