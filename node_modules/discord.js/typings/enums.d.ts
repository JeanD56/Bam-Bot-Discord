// These are enums that are used in the typings file but do not exist as actual exported values. To prevent them from
// showing up in an editor, they are imported from here instead of exporting them there directly.

/**
 * The type of an activity of a user's presence.
 * <info>Bots cannot set a `CUSTOM` activity type, it is only for custom statuses received from users</info>
 * @see {@link [ActivityType Enum](https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum)}
 */
export const enum ActivityTypes {
  PLAYING = 0,
  STREAMING = 1,
  LISTENING = 2,
  WATCHING = 3,
  CUSTOM = 4,
  COMPETING = 5,
}

/**
 * The type of an {@link ApplicationCommand} object
 * @see {@link [Application Command Types](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)}
 */
export const enum ApplicationCommandTypes {
  CHAT_INPUT = 1,
  USER = 2,
  MESSAGE = 3,
}

/**
 * The type of an {@link ApplicationCommandOption} object
 * @see {@link [Application Command Option Type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)}
 */
export const enum ApplicationCommandOptionTypes {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
}

/**
 * The type of an {@link ApplicationCommandPermissions} object
 * @see {@link [Application Command Permission Type](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type)}
 */
export const enum ApplicationCommandPermissionTypes {
  ROLE = 1,
  USER = 2,
}

/**
 * All available channel types
 * @see {@link [Channel Types](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)}
 */
export const enum ChannelTypes {
  /**
   * a guild text channel
   */
  GUILD_TEXT = 0,

  /**
   * a DM channel
   */
  DM = 1,

  /**
   * a guild voice channel
   */
  GUILD_VOICE = 2,

  /**
   * a group DM channel
   */
  GROUP_DM = 3,

  /**
   * a guild category channel
   */
  GUILD_CATEGORY = 4,

  /**
   * a guild news channel
   */
  GUILD_NEWS = 5,

  /**
   * a guild store channel
   */
  GUILD_STORE = 6,

  /**
   * a generic channel of unknown type, could be Channel or GuildChannel
   */
  UNKNOWN = 7,

  /**
   * a guild news channel's public thread channel
   */
  GUILD_NEWS_THREAD = 10,

  /**
   * a guild text channel's public thread channel
   */
  GUILD_PUBLIC_THREAD = 11,

  /**
   * a guild text channel's private thread channel
   */
  GUILD_PRIVATE_THREAD = 12,

  /**
   * a guild stage voice channel
   */
  GUILD_STAGE_VOICE = 13,
}

/**
 * The type of a message, e.g. `DEFAULT`.
 * @see {@link [Message Types](https://discord.com/developers/docs/resources/channel#message-object-message-types)}
 */
export const enum MessageTypes {
  DEFAULT,
  RECIPIENT_ADD,
  RECIPIENT_REMOVE,
  CALL,
  CHANNEL_NAME_CHANGE,
  CHANNEL_ICON_CHANGE,
  CHANNEL_PINNED_MESSAGE,
  GUILD_MEMBER_JOIN,
  USER_PREMIUM_GUILD_SUBSCRIPTION,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2,
  USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3,
  CHANNEL_FOLLOW_ADD,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING,
  THREAD_CREATED,
  REPLY,
  APPLICATION_COMMAND,
  THREAD_STARTER_MESSAGE,
  GUILD_INVITE_REMINDER,
  CONTEXT_MENU_COMMAND,
}

/**
 * The value set for a guild's default message notifications, e.g. `ALL_MESSAGES`.
 * @see {@link [Default Message Notification Level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level)}
 */
export const enum DefaultMessageNotificationLevels {
  ALL_MESSAGES = 0,
  ONLY_MENTIONS = 1,
}

/**
 * The value set for the explicit content filter levels for a guild
 * @see {@link [Explicit Content Filter Level](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)}
 */
export const enum ExplicitContentFilterLevels {
  DISABLED = 0,
  MEMBERS_WITHOUT_ROLES = 1,
  ALL_MEMBERS = 2,
}

/**
 * The entity type of a {@link GuildScheduledEvent}
 * @see {@link [Guild Scheduled Event Entity Types](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types)}
 */
export const enum GuildScheduledEventEntityTypes {
  STAGE_INSTANCE = 1,
  VOICE = 2,
  EXTERNAL = 3,
}

/**
 * Privacy level of a {@link GuildScheduledEvent} object
 * @see {@link [Guild Scheduled Event Privacy Level](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level)}
 */
export const enum GuildScheduledEventPrivacyLevels {
  GUILD_ONLY = 2,
}

/**
 * The status of a {@link GuildScheduledEvent}
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status}
 */
export const enum GuildScheduledEventStatuses {
  SCHEDULED = 1,
  ACTIVE = 2,
  COMPLETED = 3,
  CANCELED = 4,
}

/**
 * The type of an interaction response
 * @see {@link [Interaction Callback Type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)}
 */
export const enum InteractionResponseTypes {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_MESSAGE_UPDATE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
}

/**
 * The type of an {@link Interaction} object
 * @see {@link [Interaction Type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type)}
 */
export const enum InteractionTypes {
  PING = 1,
  APPLICATION_COMMAND = 2,
  MESSAGE_COMPONENT = 3,
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
}

export const enum InviteTargetType {
  STREAM = 1,
  EMBEDDED_APPLICATION = 2,
}

/**
 * The value set for a team member's membership state
 * @see {@link [Membership State Enum](https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum)}
 */
export const enum MembershipStates {
  INVITED = 1,
  ACCEPTED = 2,
}

/**
 * The style of a message button
 * @see {@link [Button Styles](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)}
 */
export const enum MessageButtonStyles {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5,
}

/**
 * The type of a message component
 * @see {@link [Component Types](https://discord.com/developers/docs/interactions/message-components#component-object-component-types)}
 */
export const enum MessageComponentTypes {
  ACTION_ROW = 1,
  BUTTON = 2,
  SELECT_MENU = 3,
}

/**
 * The required MFA level for a guild
 * @see {@link [MFA Level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level)}
 */
export const enum MFALevels {
  NONE = 0,
  ELEVATED = 1,
}

/**
 * NSFW level of a Guild
 * @see {@link [Guild NSFW Level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level)}
 */
export const enum NSFWLevels {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3,
}

/**
 * An overwrite type
 * @see {@link [Overwrite Structure](https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure)}
 */
export const enum OverwriteTypes {
  role = 0,
  member = 1,
}

/**
 * The premium tier (Server Boost level) of a guild
 * @see {@link [Premium Tier](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier)}
 */
export const enum PremiumTiers {
  NONE = 0,
  TIER_1 = 1,
  TIER_2 = 2,
  TIER_3 = 3,
}

/**
 * Privacy level of a {@link StageInstance} object
 * @see {@link [Privacy Level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level)}
 */
export const enum PrivacyLevels {
  PUBLIC = 1,
  GUILD_ONLY = 2,
}

/**
 * The value set for a sticker's format type
 * @see {@link [Sticker Format Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)}
 */
export const enum StickerFormatTypes {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
}

/**
 * The value set for a sticker's type
 * @see {@link [Sticker Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)}
 */
export const enum StickerTypes {
  STANDARD = 1,
  GUILD = 2,
}

/**
 * The value set for the verification levels for a guild
 * @see {@link [Verification Level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)}
 */
export const enum VerificationLevels {
  NONE = 0,
  LOW = 1,
  MEDIUM = 2,
  HIGH = 3,
  VERY_HIGH = 4,
}

/**
 * The value set for a webhook's type
 * @see {@link [Webhook Types](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types)}
 */
export const enum WebhookTypes {
  Incoming = 1,
  'Channel Follower' = 2,
  Application = 3,
}
