import {
  blockQuote,
  bold,
  channelMention,
  codeBlock,
  formatEmoji,
  hideLinkEmbed,
  hyperlink,
  inlineCode,
  italic,
  memberNicknameMention,
  quote,
  roleMention,
  spoiler,
  strikethrough,
  time,
  TimestampStyles,
  TimestampStylesString,
  underscore,
  userMention,
} from '@discordjs/builders';
import { Collection } from '@discordjs/collection';
import {
  APIActionRowComponent,
  APIApplicationCommand,
  APIApplicationCommandInteractionData,
  APIApplicationCommandOption,
  APIApplicationCommandPermission,
  APIAuditLogChange,
  APIButtonComponent,
  APIChannel,
  APIEmbed,
  APIEmoji,
  APIInteractionDataResolvedChannel,
  APIInteractionDataResolvedGuildMember,
  APIInteractionGuildMember,
  APIMessage,
  APIMessageComponent,
  APIOverwrite,
  APIPartialChannel,
  APIPartialEmoji,
  APIPartialGuild,
  APIRole,
  APISelectMenuComponent,
  APITemplateSerializedSourceGuild,
  APIUser,
  GatewayVoiceServerUpdateDispatchData,
  GatewayVoiceStateUpdateDispatchData,
  RESTPostAPIApplicationCommandsJSONBody,
  Snowflake,
} from 'discord-api-types/v9';
import { ChildProcess } from 'node:child_process';
import { EventEmitter } from 'node:events';
import { AgentOptions } from 'node:https';
import { Response } from 'node-fetch';
import { Stream } from 'node:stream';
import { MessagePort, Worker } from 'node:worker_threads';
import * as WebSocket from 'ws';
import {
  ActivityTypes,
  ApplicationCommandOptionTypes,
  ApplicationCommandPermissionTypes,
  ApplicationCommandTypes,
  ChannelTypes,
  DefaultMessageNotificationLevels,
  ExplicitContentFilterLevels,
  InteractionResponseTypes,
  InteractionTypes,
  InviteTargetType,
  MembershipStates,
  MessageButtonStyles,
  MessageComponentTypes,
  MessageTypes,
  MFALevels,
  NSFWLevels,
  OverwriteTypes,
  PremiumTiers,
  PrivacyLevels,
  StickerFormatTypes,
  StickerTypes,
  VerificationLevels,
  WebhookTypes,
  GuildScheduledEventEntityTypes,
  GuildScheduledEventStatuses,
  GuildScheduledEventPrivacyLevels,
} from './enums';
import {
  RawActivityData,
  RawAnonymousGuildData,
  RawApplicationCommandData,
  RawApplicationData,
  RawBaseGuildData,
  RawChannelData,
  RawClientApplicationData,
  RawDMChannelData,
  RawEmojiData,
  RawGuildAuditLogData,
  RawGuildAuditLogEntryData,
  RawGuildBanData,
  RawGuildChannelData,
  RawGuildData,
  RawGuildEmojiData,
  RawGuildMemberData,
  RawGuildPreviewData,
  RawGuildScheduledEventData,
  RawGuildTemplateData,
  RawIntegrationApplicationData,
  RawIntegrationData,
  RawInteractionData,
  RawInviteData,
  RawInviteGuildData,
  RawInviteStageInstance,
  RawMessageAttachmentData,
  RawMessageButtonInteractionData,
  RawMessageComponentInteractionData,
  RawMessageData,
  RawMessagePayloadData,
  RawMessageReactionData,
  RawMessageSelectMenuInteractionData,
  RawOAuth2GuildData,
  RawPartialGroupDMChannelData,
  RawPartialMessageData,
  RawPermissionOverwriteData,
  RawPresenceData,
  RawReactionEmojiData,
  RawRichPresenceAssets,
  RawRoleData,
  RawStageInstanceData,
  RawStickerData,
  RawStickerPackData,
  RawTeamData,
  RawTeamMemberData,
  RawThreadChannelData,
  RawThreadMemberData,
  RawTypingData,
  RawUserData,
  RawVoiceRegionData,
  RawVoiceStateData,
  RawWebhookData,
  RawWelcomeChannelData,
  RawWelcomeScreenData,
  RawWidgetData,
  RawWidgetMemberData,
} from './rawDataTypes';

//#region Classes

/**
 * Represents an activity that is part of a user's presence.
 */
export class Activity {
  public constructor(presence: Presence, data?: RawActivityData);

  /**
   * The id of the application associated with this activity
   */
  public applicationId: Snowflake | null;

  /**
   * Assets for rich presence
   */
  public assets: RichPresenceAssets | null;

  /**
   * The labels of the buttons of this rich presence
   */
  public buttons: string[];

  /**
   * The time the activity was created at
   */
  public readonly createdAt: Date;

  /**
   * Creation date of the activity
   */
  public createdTimestamp: number;

  /**
   * Details about the activity
   */
  public details: string | null;

  /**
   * Emoji for a custom activity
   */
  public emoji: Emoji | null;

  /**
   * Flags that describe the activity
   */
  public flags: Readonly<ActivityFlags>;

  /**
   * The activity's id
   */
  public id: string;

  /**
   * The activity's name
   */
  public name: string;

  /**
   * Party of the activity
   */
  public party: {
    id: string | null;
    size: [number, number];
  } | null;

  /**
   * The platform the game is being played on
   */
  public platform: ActivityPlatform | null;

  /**
   * The game's or Spotify session's id
   */
  public sessionId: string | null;

  /**
   * State of the activity
   */
  public state: string | null;

  /**
   * The Spotify song's id
   */
  public syncId: string | null;

  /**
   * Timestamps for the activity
   */
  public timestamps: {
    start: Date | null;
    end: Date | null;
  } | null;

  /**
   * The activity status's type
   */
  public type: ActivityType;

  /**
   * If the activity is being streamed, a link to the stream
   */
  public url: string | null;

  /**
   * Whether this activity is equal to another activity.
   * @param activity The activity to compare with
   */
  public equals(activity: Activity): boolean;
}

/**
 * Data structure that makes it easy to interact with an {@link Activity.flags} bitfield.
 */
export class ActivityFlags extends BitField<ActivityFlagsString> {
  /**
   * Numeric activity flags.
   * @see {@link [Activity Flags](https://discord.com/developers/docs/topics/gateway#activity-object-activity-flags)}
   */
  public static FLAGS: Record<ActivityFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<ActivityFlagsString, number>): number;
}

/**
 * Bundles common attributes and methods between {@link Guild} and {@link InviteGuild}
 */
export abstract class AnonymousGuild extends BaseGuild {
  public constructor(client: Client, data: RawAnonymousGuildData, immediatePatch?: boolean);

  /**
   * The hash of the guild banner
   */
  public banner: string | null;

  /**
   * The description of the guild, if any
   */
  public description: string | null;

  /**
   * The NSFW level of this guild
   */
  public nsfwLevel: NSFWLevel;

  /**
   * The hash of the guild invite splash image
   */
  public splash: string | null;

  /**
   * The vanity invite code of the guild, if any
   */
  public vanityURLCode: string | null;

  /**
   * The verification level of the guild
   */
  public verificationLevel: VerificationLevel;

  /**
   * The URL to this guild's banner.
   * @param options Options for the Image URL
   */
  public bannerURL(options?: StaticImageURLOptions): string | null;

  /**
   * The URL to this guild's invite splash image.
   * @param options Options for the Image URL
   */
  public splashURL(options?: StaticImageURLOptions): string | null;
}

/**
 * Represents an OAuth2 Application.
 */
export abstract class Application extends Base {
  public constructor(client: Client, data: RawApplicationData);

  /**
   * The time the application was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the application was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The application's description
   */
  public description: string | null;

  /**
   * The application's icon hash
   */
  public icon: string | null;

  /**
   * The application's id
   */
  public id: Snowflake;

  /**
   * The name of the application
   */
  public name: string | null;

  /**
   * A link to this application's cover image.
   * @param options Options for the Image URL
   */
  public coverURL(options?: StaticImageURLOptions): string | null;

  /**
   * Gets the application's rich presence assets.
   */
  public fetchAssets(): Promise<ApplicationAsset[]>;

  /**
   * A link to the application's icon.
   * @param options Options for the Image URL
   */
  public iconURL(options?: StaticImageURLOptions): string | null;

  /**
   * Transforms the application to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the application's name instead of the
   * Application object.
   * @example
   * // Logs: Application name: My App
   * console.log(`Application name: ${application}`);
   */
  public toString(): string | null;
}

/**
 * Represents an application command.
 */
export class ApplicationCommand<PermissionsFetchType = {}> extends Base {
  public constructor(client: Client, data: RawApplicationCommandData, guild?: Guild, guildId?: Snowflake);

  /**
   * The parent application's id
   */
  public applicationId: Snowflake;

  /**
   * The time the command was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the command was created at
   */
  public readonly createdTimestamp: number;

  /**
   * Whether the command is enabled by default when the app is added to a guild
   */
  public defaultPermission: boolean;

  /**
   * The description of this command
   */
  public description: string;

  /**
   * The guild this command is part of
   */
  public guild: Guild | null;

  /**
   * The guild's id this command is part of, this may be non-null when `guild` is `null` if the command
   * was fetched from the `ApplicationCommandManager`
   */
  public guildId: Snowflake | null;

  /**
   * The manager that this command belongs to
   */
  public readonly manager: ApplicationCommandManager;

  /**
   * The command's id
   */
  public id: Snowflake;

  /**
   * The name of this command
   */
  public name: string;

  /**
   * The options of this command
   */
  public options: ApplicationCommandOption[];

  /**
   * The manager for permissions of this command on its guild or arbitrary guilds when the command is global
   */
  public permissions: ApplicationCommandPermissionsManager<
    PermissionsFetchType,
    PermissionsFetchType,
    PermissionsFetchType,
    Guild | null,
    Snowflake
  >;

  /**
   * The type of this application command
   */
  public type: ApplicationCommandType;

  /**
   * Autoincrementing version identifier updated during substantial record changes
   */
  public version: Snowflake;

  /**
   * Deletes this command.
   * @example
   * // Delete this command
   * command.delete()
   *   .then(console.log)
   *   .catch(console.error);
   */
  public delete(): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Edits this application command.
   * @param data The data to update the command with
   * @example
   * // Edit the description of this command
   * command.edit({
   *   description: 'New description',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public edit(data: ApplicationCommandData): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Edits the name of this ApplicationCommand
   * @param name The new name of the command
   */
  public setName(name: string): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Edits the description of this ApplicationCommand
   * @param description The new description of the command
   */
  public setDescription(description: string): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Edits the default permission of this ApplicationCommand
   * @param defaultPermission The default permission for this command
   */
  public setDefaultPermission(defaultPermission?: boolean): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Edits the options of this ApplicationCommand
   * @param options The options to set for this command
   */
  public setOptions(options: ApplicationCommandOptionData[]): Promise<ApplicationCommand<PermissionsFetchType>>;

  /**
   * Whether this command equals another command. It compares all properties, so for most operations
   * it is advisable to just compare `command.id === command2.id` as it is much faster and is often
   * what most users need.
   * @param command The command to compare with
   * @param enforceOptionOrder Whether to strictly check that options and choices are in the same
   * order in the array <info>The client may not always respect this ordering!</info>
   */
  public equals(
    command: ApplicationCommand | ApplicationCommandData | RawApplicationCommandData,
    enforceOptionorder?: boolean,
  ): boolean;

  /**
   * Recursively checks that all options for an {@link ApplicationCommand} are equal to the provided options.
   * In most cases it is better to compare using {@link ApplicationCommand.equals}
   * @param existing The options on the existing command,
   * should be {@link ApplicationCommand.options}
   * @param options The options to compare against
   * @param enforceOptionOrder Whether to strictly check that options and choices are in the same
   * order in the array <info>The client may not always respect this ordering!</info>
   */
  public static optionsEqual(
    existing: ApplicationCommandOption[],
    options: ApplicationCommandOption[] | ApplicationCommandOptionData[] | APIApplicationCommandOption[],
    enforceOptionorder?: boolean,
  ): boolean;

  /**
   * Checks that an option for an {@link ApplicationCommand} is equal to the provided option
   * In most cases it is better to compare using {@link ApplicationCommand.equals}
   * @param existing The option on the existing command,
   * should be from {@link ApplicationCommand.options}
   * @param option The option to compare against
   * @param enforceOptionOrder Whether to strictly check that options or choices are in the same
   * order in their array <info>The client may not always respect this ordering!</info>
   */
  private static _optionEquals(
    existing: ApplicationCommandOption,
    options: ApplicationCommandOption | ApplicationCommandOptionData | APIApplicationCommandOption,
    enforceOptionorder?: boolean,
  ): boolean;

  /**
   * Transforms an {@link ApplicationCommandOptionData} object into something that can be used with the API.
   * @param option The option to transform
   * @param received Whether this option has been received from Discord
   */
  private static transformOption(option: ApplicationCommandOptionData, received?: boolean): unknown;

  private static transformCommand(command: ApplicationCommandData): RESTPostAPIApplicationCommandsJSONBody;

  private static isAPICommandData(command: object): command is RESTPostAPIApplicationCommandsJSONBody;
}

/**
 * Data that can be resolved to an Application. This can be:
 * * An Application
 * * An Activity with associated Application
 * * A Snowflake
 */
export type ApplicationResolvable = Application | Activity | Snowflake;

/**
 * Data structure that makes it easy to interact with a {@link ClientApplication.flags} bitfield.
 */
export class ApplicationFlags extends BitField<ApplicationFlagsString> {
  /**
   * Numeric application flags.
   * @see {@link [Application Flags](https://discord.com/developers/docs/resources/application#application-object-application-flags)}
   */
  public static FLAGS: Record<ApplicationFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<ApplicationFlagsString, number>): number;
}

/**
 * Represents a data model that is identifiable by a Snowflake (i.e. Discord API data models).
 */
export class Base {
  public constructor(client: Client);

  /**
   * The client that instantiated this
   */
  public readonly client: Client;

  /**
   * Transforms the class to a plain object.
   */
  public toJSON(...props: Record<string, boolean | string>[]): unknown;

  /**
   * Returns the id of this object.
   */
  public valueOf(): string;
}

/**
 * The base class for all clients.
 */
export class BaseClient extends EventEmitter {
  public constructor(options?: ClientOptions | WebhookClientOptions);

  /**
   * API shortcut
   */
  private readonly api: unknown;

  /**
   * The REST manager of the client
   */
  private rest: unknown;

  /**
   * Decrements max listeners by one, if they are not zero.
   */
  private decrementMaxListeners(): void;

  /**
   * Increments max listeners by one, if they are not zero.
   */
  private incrementMaxListeners(): void;

  public on<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public once<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public emit<K extends keyof BaseClientEvents>(event: K, ...args: BaseClientEvents[K]): boolean;
  public emit<S extends string | symbol>(event: Exclude<S, keyof BaseClientEvents>, ...args: unknown[]): boolean;

  public off<K extends keyof BaseClientEvents>(
    event: K,
    listener: (...args: BaseClientEvents[K]) => Awaitable<void>,
  ): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof BaseClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public removeAllListeners<K extends keyof BaseClientEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof BaseClientEvents>): this;

  /**
   * The options the client was instantiated with
   */
  public options: ClientOptions | WebhookClientOptions;

  /**
   * Destroys all assets used by the base client.
   */
  public destroy(): void;

  /**
   * Transforms the base client into a plain object.
   */
  public toJSON(...props: Record<string, boolean | string>[]): unknown;
}

export type GuildCacheMessage<Cached extends CacheType> = CacheTypeReducer<
  Cached,
  Message<true>,
  APIMessage,
  Message | APIMessage,
  Message | APIMessage
>;

/**
 * Represents a command interaction.
 */
export abstract class BaseCommandInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  /**
   * The invoked application command, if it was fetched before
   */
  public readonly command: ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;

  /**
   * The options passed to the command.
   */
  public options: Omit<
    CommandInteractionOptionResolver<Cached>,
    | 'getMessage'
    | 'getFocused'
    | 'getMentionable'
    | 'getRole'
    | 'getNumber'
    | 'getInteger'
    | 'getString'
    | 'getChannel'
    | 'getBoolean'
    | 'getSubcommandGroup'
    | 'getSubcommand'
  >;

  /**
   * The id of the channel this interaction was sent in
   */
  public channelId: Snowflake;

  /**
   * The invoked application command's id
   */
  public commandId: Snowflake;

  /**
   * The invoked application command's name
   */
  public commandName: string;

  /**
   * Whether the reply to this interaction has been deferred
   */
  public deferred: boolean;

  /**
   * Whether the reply to this interaction is ephemeral
   */
  public ephemeral: boolean | null;

  /**
   * Whether this interaction has already been replied to
   */
  public replied: boolean;

  /**
   * An associated interaction webhook, can be used to further interact with this interaction
   */
  public webhook: InteractionWebhook;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is BaseCommandInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is BaseCommandInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is BaseCommandInteraction<'raw'>;

  /**
   * Defers the reply to this interaction.
   * @param options Options for deferring the reply to this interaction
   * @example
   * // Defer the reply to this interaction
   * interaction.deferReply()
   *   .then(console.log)
   *   .catch(console.error)
   * @example
   * // Defer to send an ephemeral reply later
   * interaction.deferReply({ ephemeral: true })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options?: InteractionDeferReplyOptions): Promise<void>;

  /**
   * Deletes the initial reply to this interaction.
   * @see {@link Webhook.deleteMessage}
   * @example
   * // Delete the reply to this interaction
   * interaction.deleteReply()
   *   .then(console.log)
   *   .catch(console.error);
   */
  public deleteReply(): Promise<void>;

  /**
   * Edits the initial reply to this interaction.
   * @see {@link Webhook.editMessage}
   * @param options The new options for the message
   * @example
   * // Edit the reply to this interaction
   * interaction.editReply('New content')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public editReply(options: string | MessagePayload | WebhookEditMessageOptions): Promise<GuildCacheMessage<Cached>>;

  /**
   * Fetches the initial reply to this interaction.
   * @see {@link Webhook.fetchMessage}
   * @example
   * // Fetch the reply to this interaction
   * interaction.fetchReply()
   *   .then(reply => console.log(`Replied with ${reply.content}`))
   *   .catch(console.error);
   */
  public fetchReply(): Promise<GuildCacheMessage<Cached>>;

  /**
   * Send a follow-up message to this interaction.
   * @param options The options for the reply
   */
  public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;

  /**
   * Creates a reply to this interaction.
   * <info>Use the `fetchReply` option to get the bot's reply message.</info>
   * @param options The options for the reply
   * @example
   * // Reply to the interaction and fetch the response
   * interaction.reply({ content: 'Pong!', fetchReply: true })
   *   .then((message) => console.log(`Reply sent with content ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Create an ephemeral reply with an embed
   * const embed = new MessageEmbed().setDescription('Pong!');
   *
   * interaction.reply({ embeds: [embed], ephemeral: true })
   *   .then(() => console.log('Reply sent.'))
   *   .catch(console.error);
   */
  public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  /**
   * Transforms an option received from the API.
   * @param option The received option
   * @param resolved The resolved interaction data
   */
  private transformOption(
    option: APIApplicationCommandOption,
    resolved: APIApplicationCommandInteractionData['resolved'],
  ): CommandInteractionOption<Cached>;

  /**
   * Transforms the resolved received from the API.
   * @param resolved The received resolved objects
   */
  private transformResolved(
    resolved: APIApplicationCommandInteractionData['resolved'],
  ): CommandInteractionResolvedData<Cached>;
}

/**
 * The base class for {@link Guild}, {@link OAuth2Guild} and {@link InviteGuild}.
 */
export abstract class BaseGuild extends Base {
  public constructor(client: Client, data: RawBaseGuildData);

  /**
   * The time this guild was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp this guild was created at
   */
  public readonly createdTimestamp: number;

  /**
   * An array of features available to this guild
   */
  public features: GuildFeatures[];

  /**
   * The icon hash of this guild
   */
  public icon: string | null;

  /**
   * The guild's id
   */
  public id: Snowflake;

  /**
   * The name of this guild
   */
  public name: string;

  /**
   * The acronym that shows up in place of a guild icon
   */
  public readonly nameAcronym: string;

  /**
   * Whether this guild is partnered
   */
  public readonly partnered: boolean;

  /**
   * Whether this guild is verified
   */
  public readonly verified: boolean;

  /**
   * Fetches this guild.
   */
  public fetch(): Promise<Guild>;

  /**
   * The URL to this guild's icon.
   * @param options Options for the Image URL
   */
  public iconURL(options?: ImageURLOptions): string | null;

  /**
   * When concatenated with a string, this automatically returns the guild's name instead of the Guild object.
   */
  public toString(): string;
}

/**
 * Parent class for {@link GuildEmoji} and {@link GuildPreviewEmoji}.
 */
export class BaseGuildEmoji extends Emoji {
  public constructor(client: Client, data: RawGuildEmojiData, guild: Guild | GuildPreview);

  /**
   * Whether this emoji is available
   */
  public available: boolean | null;

  /**
   * The time the emoji was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the emoji was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The guild this emoji is a part of
   */
  public guild: Guild | GuildPreview;

  /**
   * The emoji's id
   */
  public id: Snowflake;

  /**
   * Whether this emoji is managed by an external service
   */
  public managed: boolean | null;

  /**
   * Whether or not this emoji requires colons surrounding it
   */
  public requiresColons: boolean | null;
}

/**
 * Represents a text-based guild channel on Discord.
 */
export class BaseGuildTextChannel extends TextBasedChannelMixin(GuildChannel) {
  /**
   * @param guild The guild the text channel is part of
   * @param data The data for the text channel
   * @param client A safety parameter for the client that instantiated this
   */
  public constructor(guild: Guild, data?: RawGuildChannelData, client?: Client, immediatePatch?: boolean);

  /**
   * The default auto archive duration for newly created threads in this channel
   */
  public defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;

  /**
   * A manager of the messages sent to this channel
   */
  public messages: MessageManager;

  /**
   * If the guild considers this channel NSFW
   */
  public nsfw: boolean;

  /**
   * A manager of the threads belonging to this channel
   */
  public threads: ThreadManager<AllowedThreadTypeForTextChannel | AllowedThreadTypeForNewsChannel>;

  /**
   * The topic of the text channel
   */
  public topic: string | null;

  /**
   * Creates an invite to this guild channel.
   * @param options The options for creating the invite
   * @example
   * // Create an invite to a channel
   * channel.createInvite()
   *   .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
   *   .catch(console.error);
   */
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;

  /**
   * Creates a webhook for the channel.
   * @param name The name of the webhook
   * @param options Options for creating the webhook
   * @returns Returns the created Webhook
   * @example
   * // Create a webhook for the current channel
   * channel.createWebhook('Snek', {
   *   avatar: 'https://i.imgur.com/mI8XcpG.jpg',
   *   reason: 'Needed a cool new Webhook'
   * })
   *   .then(console.log)
   *   .catch(console.error)
   */
  public createWebhook(name: string, options?: ChannelWebhookCreateOptions): Promise<Webhook>;

  /**
   * Fetches a collection of invites to this guild channel.
   * Resolves with a collection mapping invites by their codes.
   * @param cache Whether or not to cache the fetched invites
   */
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;

  /**
   * Sets the default auto archive duration for all newly created threads in this channel.
   * @param defaultAutoArchiveDuration The new default auto archive duration
   * @param reason Reason for changing the channel's default auto archive duration
   */
  public setDefaultAutoArchiveDuration(
    defaultAutoArchiveDuration: ThreadAutoArchiveDuration,
    reason?: string,
  ): Promise<this>;

  /**
   * Sets whether this channel is flagged as NSFW.
   * @param nsfw Whether the channel should be considered NSFW
   * @param reason Reason for changing the channel's NSFW flag
   */
  public setNSFW(nsfw?: boolean, reason?: string): Promise<this>;

  /**
   * Sets a new topic for the guild channel.
   * @param topic The new topic for the guild channel
   * @param reason Reason for changing the guild channel's topic
   * @example
   * // Set a new channel topic
   * channel.setTopic('needs more rate limiting')
   *   .then(newChannel => console.log(`Channel's new topic is ${newChannel.topic}`))
   *   .catch(console.error);
   */
  public setTopic(topic: string | null, reason?: string): Promise<this>;

  /**
   * Sets the type of this channel (only conversion between text and news is supported)
   * @param type The new channel type
   * @param reason Reason for changing the channel's type
   */
  public setType(type: Pick<typeof ChannelTypes, 'GUILD_TEXT'>, reason?: string): Promise<TextChannel>;
  public setType(type: Pick<typeof ChannelTypes, 'GUILD_NEWS'>, reason?: string): Promise<NewsChannel>;

  /**
   * Fetches all webhooks for the channel.
   * @example
   * // Fetch webhooks
   * channel.fetchWebhooks()
   *   .then(hooks => console.log(`This channel has ${hooks.size} hooks`))
   *   .catch(console.error);
   */
  public fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;
}

/**
 * Represents a voice-based guild channel on Discord.
 */
export class BaseGuildVoiceChannel extends GuildChannel {
  public constructor(guild: Guild, data?: RawGuildChannelData);

  /**
   * The members in this voice-based channel
   */
  public readonly members: Collection<Snowflake, GuildMember>;

  /**
   * Checks if the voice-based channel is full
   */
  public readonly full: boolean;

  /**
   * Whether the channel is joinable by the client user
   */
  public readonly joinable: boolean;

  /**
   * The RTC region for this voice-based channel. This region is automatically selected if `null`.
   */
  public rtcRegion: string | null;

  /**
   * The bitrate of this voice-based channel
   */
  public bitrate: number;

  /**
   * The maximum amount of users allowed in this channel.
   */
  public userLimit: number;

  /**
   * Creates an invite to this guild channel.
   * @param options The options for creating the invite
   * @example
   * // Create an invite to a channel
   * channel.createInvite()
   *   .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
   *   .catch(console.error);
   */
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;

  /**
   * Sets the RTC region of the channel.
   * @param region The new region of the channel. Set to `null` to remove a specific region for the channel
   * @example
   * // Set the RTC region to europe
   * channel.setRTCRegion('europe');
   * @example
   * // Remove a fixed region for this channel - let Discord decide automatically
   * channel.setRTCRegion(null);
   */
  public setRTCRegion(region: string | null): Promise<this>;

  /**
   * Fetches a collection of invites to this guild channel.
   * Resolves with a collection mapping invites by their codes.
   * @param cache Whether or not to cache the fetched invites
   */
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;
}

/**
 * Represents an interactive component of a Message. It should not be necessary to construct this directly.
 * See {@link MessageComponent}
 */
export class BaseMessageComponent {
  /**
   * @param data The options for this component
   */
  public constructor(data?: BaseMessageComponent | BaseMessageComponentOptions);

  /**
   * The type of this component
   */
  public type: MessageComponentType | null;

  /**
   * Constructs a MessageComponent based on the type of the incoming data
   * @param data Data for a MessageComponent
   * @param client Client constructing this component
   */
  private static create(data: MessageComponentOptions, client?: Client | WebhookClient): MessageComponent | undefined;

  /**
   * Resolves the type of a MessageComponent
   * @param type The type to resolve
   */
  private static resolveType(type: MessageComponentTypeResolvable): MessageComponentType;
}

/**
 * Data structure that makes it easy to interact with a bitfield.
 */
export class BitField<S extends string, N extends number | bigint = number> {
  /**
   * @param bits Bit(s) to read from
   */
  public constructor(bits?: BitFieldResolvable<S, N>);

  /**
   * Bitfield of the packed bits
   */
  public bitfield: N;

  /**
   * Adds bits to these ones.
   * @param bits Bits to add
   * @returns These bits or new BitField if the instance is frozen.
   */
  public add(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;

  /**
   * Checks whether the bitfield has a bit, or any of multiple bits.
   * @param bit Bit(s) to check for
   */
  public any(bit: BitFieldResolvable<S, N>): boolean;

  /**
   * Checks if this bitfield equals another
   * @param bit Bit(s) to check for
   */
  public equals(bit: BitFieldResolvable<S, N>): boolean;

  /**
   * Freezes these bits, making them immutable.
   */
  public freeze(): Readonly<BitField<S, N>>;

  /**
   * Checks whether the bitfield has a bit, or multiple bits.
   * @param bit Bit(s) to check for
   */
  public has(bit: BitFieldResolvable<S, N>): boolean;

  /**
   * Gets all given bits that are missing from the bitfield.
   * @param bits Bit(s) to check for
   * @param hasParams Additional parameters for the has method, if any
   */
  public missing(bits: BitFieldResolvable<S, N>, ...hasParams: readonly unknown[]): S[];

  /**
   * Removes bits from these.
   * @param bits Bits to remove
   * @returns These bits or new BitField if the instance is frozen.
   */
  public remove(...bits: BitFieldResolvable<S, N>[]): BitField<S, N>;

  /**
   * Gets an object mapping field names to a {@link boolean} indicating whether the
   * bit is available.
   * @param hasParams Additional parameters for the has method, if any
   */
  public serialize(...hasParams: readonly unknown[]): Record<S, boolean>;

  /**
   * Gets an {@link Array} of bitfield names based on the bits available.
   * @param hasParams Additional parameters for the has method, if any
   */
  public toArray(...hasParams: readonly unknown[]): S[];

  public toJSON(): N extends number ? number : string;

  public valueOf(): N;

  public [Symbol.iterator](): IterableIterator<S>;

  /**
   * Numeric bitfield flags.
   * <info>Defined in extension classes</info>
   */
  public static FLAGS: Record<string, number | bigint>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint;
}

/**
 * Represents a button interaction.
 */
export class ButtonInteraction<Cached extends CacheType = CacheType> extends MessageComponentInteraction<Cached> {
  public constructor(client: Client, data: RawMessageButtonInteractionData);

  /**
   * The component which was interacted with
   */
  public readonly component: CacheTypeReducer<
    Cached,
    MessageButton,
    APIButtonComponent,
    MessageButton | APIButtonComponent,
    MessageButton | APIButtonComponent
  >;

  /**
   * The type of component which was interacted with
   */
  public componentType: 'BUTTON';

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is ButtonInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is ButtonInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is ButtonInteraction<'raw'>;
}

export type KeyedEnum<K, T> = {
  [Key in keyof K]: T | string;
};

export type EnumValueMapped<E extends KeyedEnum<T, number>, T extends Partial<Record<keyof E, unknown>>> = T & {
  [Key in keyof T as E[Key]]: T[Key];
};

export type MappedChannelCategoryTypes = EnumValueMapped<
  typeof ChannelTypes,
  {
    GUILD_NEWS: NewsChannel;
    GUILD_VOICE: VoiceChannel;
    GUILD_TEXT: TextChannel;
    GUILD_STORE: StoreChannel;
    GUILD_STAGE_VOICE: StageChannel;
  }
>;

export type CategoryChannelTypes = ExcludeEnum<
  typeof ChannelTypes,
  | 'DM'
  | 'GROUP_DM'
  | 'UNKNOWN'
  | 'GUILD_PUBLIC_THREAD'
  | 'GUILD_NEWS_THREAD'
  | 'GUILD_PRIVATE_THREAD'
  | 'GUILD_CATEGORY'
>;

/**
 * Represents a guild category channel on Discord.
 */
export class CategoryChannel extends GuildChannel {
  /**
   * Channels that are a part of this category
   */
  public readonly children: Collection<Snowflake, Exclude<NonThreadGuildBasedChannel, CategoryChannel>>;

  /**
   * The type of the channel
   */
  public type: 'GUILD_CATEGORY';

  /**
   * Creates a new channel within this category.
   * <info>You cannot create a channel of type `GUILD_CATEGORY` inside a CategoryChannel.</info>
   * @param name The name of the new channel
   * @param options Options for creating the new channel
   */
  public createChannel<T extends Exclude<CategoryChannelTypes, 'GUILD_STORE'>>(
    name: string,
    options: CategoryCreateChannelOptions & { type: T },
  ): Promise<MappedChannelCategoryTypes[T]>;

  /**
   * Creates a new channel within this category.
   * <info>You cannot create a channel of type `GUILD_CATEGORY` inside a CategoryChannel.</info>
   * @param name The name of the new channel
   * @param options Options for creating the new channel
   * @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/4414590563479) for more information
   */
  public createChannel(
    name: string,
    options: CategoryCreateChannelOptions & { type: 'GUILD_STORE' | ChannelTypes.GUILD_STORE },
  ): Promise<StoreChannel>;
  public createChannel(name: string, options?: CategoryCreateChannelOptions): Promise<TextChannel>;
}

/**
 * Data that can be resolved to give a Category Channel object. This can be:
 * * A CategoryChannel object
 * * A Snowflake
 */
export type CategoryChannelResolvable = Snowflake | CategoryChannel;

/**
 * Represents any channel on Discord.
 */
export class Channel extends Base {
  public constructor(client: Client, data?: RawChannelData, immediatePatch?: boolean);

  /**
   * The time the channel was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the channel was created at
   */
  public readonly createdTimestamp: number;

  /**
   * Whether the channel has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The channel's id
   */
  public id: Snowflake;

  /**
   * Whether this Channel is a partial
   * <info>This is always false outside of DM channels.</info>
   */
  public readonly partial: false;

  /**
   * The type of the channel
   */
  public type: keyof typeof ChannelTypes;

  /**
   * Deletes this channel.
   * @example
   * // Delete the channel
   * channel.delete()
   *   .then(console.log)
   *   .catch(console.error);
   */
  public delete(): Promise<this>;

  /**
   * Fetches this channel.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<this>;

  /**
   * Indicates whether this channel is {@link TextBasedChannels text-based}.
   */
  public isText(): this is TextBasedChannel;

  /**
   * Indicates whether this channel is {@link BaseGuildVoiceChannel voice-based}.
   */
  public isVoice(): this is BaseGuildVoiceChannel;

  /**
   * Indicates whether this channel is a {@link ThreadChannel}.
   */
  public isThread(): this is ThreadChannel;

  /**
   * When concatenated with a string, this automatically returns the channel's mention instead of the Channel object.
   * @example
   * // Logs: Hello from <#123456789012345678>!
   * console.log(`Hello from ${channel}!`);
   */
  public toString(): ChannelMention;
}

export type If<T extends boolean, A, B = null> = T extends true ? A : T extends false ? B : A | B;

/**
 * The main hub for interacting with the Discord API, and the starting point for any bot.
 */
export class Client<Ready extends boolean = boolean> extends BaseClient {
  /**
   * @param options Options for the client
   */
  public constructor(options: ClientOptions);

  /**
   * The action manager of the client
   */
  private actions: unknown;

  /**
   * The presence of the Client
   */
  private presence: ClientPresence;

  /**
   * Calls [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) on a script
   * with the client as `this`.
   * @param script Script to eval
   */
  private _eval(script: string): unknown;

  /**
   * Validates the client options.
   * @param options Options to validate
   */
  private _validateOptions(options: ClientOptions): void;

  /**
   * The action manager of the client
   */
  public application: If<Ready, ClientApplication>;

  /**
   * All of the {@link Channel}s that the client is currently handling, mapped by their ids -
   * as long as sharding isn't being used, this will be *every* channel in *every* guild the bot
   * is a member of. Note that DM channels will not be initially cached, and thus not be present
   * in the Manager without their explicit fetching or use.
   */
  public channels: ChannelManager;

  /**
   * All custom emojis that the client has access to, mapped by their ids
   */
  public readonly emojis: BaseGuildEmojiManager;

  /**
   * All of the guilds the client is currently handling, mapped by their ids -
   * as long as sharding isn't being used, this will be *every* guild the bot is a member of
   */
  public guilds: GuildManager;

  /**
   * The options the client was instantiated with
   */
  public options: ClientOptions;

  /**
   * Time at which the client was last regarded as being in the `READY` state
   * (each time the client disconnects and successfully reconnects, this will be overwritten)
   */
  public readyAt: If<Ready, Date>;

  /**
   * Timestamp of the time the client was last `READY` at
   */
  public readonly readyTimestamp: If<Ready, number>;

  /**
   * The sweeping functions and their intervals used to periodically sweep caches
   */
  public sweepers: Sweepers;

  /**
   * Shard helpers for the client (only if the process was spawned from a {@link ShardingManager})
   */
  public shard: ShardClientUtil | null;

  /**
   * Authorization token for the logged in bot.
   * If present, this defaults to `process.env.DISCORD_TOKEN` when instantiating the client
   * <warn>This should be kept private at all times.</warn>
   */
  public token: If<Ready, string, string | null>;

  /**
   * How long it has been since the client last entered the `READY` state in milliseconds
   */
  public uptime: If<Ready, number>;

  /**
   * User that the client is logged in as
   */
  public user: If<Ready, ClientUser>;

  /**
   * All of the {@link User} objects that have been cached at any point, mapped by their ids
   */
  public users: UserManager;

  /**
   * The voice manager of the client
   */
  public voice: ClientVoiceManager;

  /**
   * The WebSocket manager of the client
   */
  public ws: WebSocketManager;

  /**
   * Logs out, terminates the connection to Discord, and destroys the client.
   */
  public destroy(): void;

  /**
   * Obtains a guild preview from Discord, available for all guilds the bot is in and all Discoverable guilds.
   * @param guild The guild to fetch the preview for
   */
  public fetchGuildPreview(guild: GuildResolvable): Promise<GuildPreview>;

  /**
   * Obtains an invite from Discord.
   * @param invite Invite code or URL
   * @param options Options for fetching the invite
   * @example
   * client.fetchInvite('https://discord.gg/djs')
   *   .then(invite => console.log(`Obtained invite with code: ${invite.code}`))
   *   .catch(console.error);
   */
  public fetchInvite(invite: InviteResolvable, options?: ClientFetchInviteOptions): Promise<Invite>;

  /**
   * Obtains a template from Discord.
   * @param template Template code or URL
   * @example
   * client.fetchGuildTemplate('https://discord.new/FKvmczH2HyUf')
   *   .then(template => console.log(`Obtained template with code: ${template.code}`))
   *   .catch(console.error);
   */
  public fetchGuildTemplate(template: GuildTemplateResolvable): Promise<GuildTemplate>;

  /**
   * Obtains the available voice regions from Discord.
   * @example
   * client.fetchVoiceRegions()
   *   .then(regions => console.log(`Available regions are: ${regions.map(region => region.name).join(', ')}`))
   *   .catch(console.error);
   */
  public fetchVoiceRegions(): Promise<Collection<string, VoiceRegion>>;

  /**
   * Obtains a sticker from Discord.
   * @param id The sticker's id
   * @example
   * client.fetchSticker('id')
   *   .then(sticker => console.log(`Obtained sticker with name: ${sticker.name}`))
   *   .catch(console.error);
   */
  public fetchSticker(id: Snowflake): Promise<Sticker>;

  /**
   * Obtains the list of sticker packs available to Nitro subscribers from Discord.
   * @example
   * client.fetchPremiumStickerPacks()
   *   .then(packs => console.log(`Available sticker packs are: ${packs.map(pack => pack.name).join(', ')}`))
   *   .catch(console.error);
   */
  public fetchPremiumStickerPacks(): Promise<Collection<Snowflake, StickerPack>>;

  /**
   * Obtains a webhook from Discord.
   * @param id The webhook's id
   * @param token Token for the webhook
   * @example
   * client.fetchWebhook('id', 'token')
   *   .then(webhook => console.log(`Obtained webhook with name: ${webhook.name}`))
   *   .catch(console.error);
   */
  public fetchWebhook(id: Snowflake, token?: string): Promise<Webhook>;

  /**
   * Obtains the widget data of a guild from Discord, available for guilds with the widget enabled.
   * @param guild The guild to fetch the widget data for
   */
  public fetchGuildWidget(guild: GuildResolvable): Promise<Widget>;

  /**
   * Generates a link that can be used to invite the bot to a guild.
   * @param options Options for the invite
   * @example
   * const link = client.generateInvite({
   *   scopes: ['applications.commands'],
   * });
   * console.log(`Generated application invite link: ${link}`);
   * @example
   * const link = client.generateInvite({
   *   permissions: [
   *     Permissions.FLAGS.SEND_MESSAGES,
   *     Permissions.FLAGS.MANAGE_GUILD,
   *     Permissions.FLAGS.MENTION_EVERYONE,
   *   ],
   *   scopes: ['bot'],
   * });
   * console.log(`Generated bot invite link: ${link}`);
   */
  public generateInvite(options?: InviteGenerationOptions): string;

  /**
   * Logs the client in, establishing a WebSocket connection to Discord.
   * @param token Token of the account to log in with
   * @returns Token of the account used
   * @example
   * client.login('my token');
   */
  public login(token?: string): Promise<string>;

  /**
   * Returns whether the client has logged in, indicative of being able to access
   * properties such as `user` and `application`.
   */
  public isReady(): this is Client<true>;

  /**
   * Sweeps all text-based channels' messages and removes the ones older than the max message lifetime.
   * If the message has been edited, the time of the edit is used rather than the time of the original message.
   * @param lifetime Messages that are older than this (in seconds)
   * will be removed from the caches. The default is based on {@link ClientOptions.messageCacheLifetime}
   * @returns Amount of messages that were removed from the caches,
   * or -1 if the message cache lifetime is unlimited
   * @example
   * // Remove all messages older than 1800 seconds from the messages cache
   * const amount = client.sweepMessages(1800);
   * console.log(`Successfully removed ${amount} messages from the cache.`);
   * @deprecated Use {@link Sweepers.sweepMessages} instead
   */
  public sweepMessages(lifetime?: number): number;

  /**
   * Transforms the client into a plain object.
   */
  public toJSON(): unknown;

  public on<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public on<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public once<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public once<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public emit<K extends keyof ClientEvents>(event: K, ...args: ClientEvents[K]): boolean;
  public emit<S extends string | symbol>(event: Exclude<S, keyof ClientEvents>, ...args: unknown[]): boolean;

  public off<K extends keyof ClientEvents>(event: K, listener: (...args: ClientEvents[K]) => Awaitable<void>): this;
  public off<S extends string | symbol>(
    event: Exclude<S, keyof ClientEvents>,
    listener: (...args: any[]) => Awaitable<void>,
  ): this;

  public removeAllListeners<K extends keyof ClientEvents>(event?: K): this;
  public removeAllListeners<S extends string | symbol>(event?: Exclude<S, keyof ClientEvents>): this;
}

/**
 * Represents a Client OAuth2 Application.
 */
export class ClientApplication extends Application {
  public constructor(client: Client, data: RawClientApplicationData);

  /**
   * If this application's bot is public
   */
  public botPublic: boolean | null;

  /**
   * If this application's bot requires a code grant when using the OAuth2 flow
   */
  public botRequireCodeGrant: boolean | null;

  /**
   * The application command manager for this application
   */
  public commands: ApplicationCommandManager;

  /**
   * The hash of the application's cover image
   */
  public cover: string | null;

  /**
   * The flags this application has
   */
  public flags: Readonly<ApplicationFlags>;

  /**
   * The owner of this OAuth application
   */
  public owner: User | Team | null;

  /**
   * Whether this application is partial
   */
  public readonly partial: boolean;

  /**
   * The application's RPC origins, if enabled
   */
  public rpcOrigins: string[];

  /**
   * Obtains this application from Discord.
   */
  public fetch(): Promise<ClientApplication>;
}

/**
 * Represents the client's presence.
 */
export class ClientPresence extends Presence {
  /**
   * @param client The instantiating client
   * @param data The data for the client presence
   */
  public constructor(client: Client, data: RawPresenceData);

  /**
   * Parses presence data into a packet ready to be sent to Discord
   * @param presence The data to parse
   */
  private _parse(data: PresenceData): RawPresenceData;

  /**
   * Sets the client's presence
   * @param presence The data to set the presence to
   */
  public set(presence: PresenceData): ClientPresence;
}

/**
 * Represents the logged in client's Discord user.
 */
export class ClientUser extends User {
  /**
   * If the bot's {@link ClientApplication.owner Owner} has MFA enabled on their account
   */
  public mfaEnabled: boolean;

  /**
   * Represents the client user's presence
   */
  public readonly presence: ClientPresence;

  /**
   * Whether or not this account has been verified
   */
  public verified: boolean;

  /**
   * Edits the logged in client.
   * @param data The new data
   */
  public edit(data: ClientUserEditData): Promise<this>;

  /**
   * Sets the activity the client user is playing.
   * @param name Activity being played, or options for setting the activity
   * @param options Options for setting the activity
   * @example
   * // Set the client user's activity
   * client.user.setActivity('discord.js', { type: 'WATCHING' });
   */
  public setActivity(options?: ActivityOptions): ClientPresence;
  public setActivity(name: string, options?: ActivityOptions): ClientPresence;

  /**
   * Sets/removes the AFK flag for the client user.
   * @param afk Whether or not the user is AFK
   * @param shardId Shard Id(s) to have the AFK flag set on
   */
  public setAFK(afk?: boolean, shardId?: number | number[]): ClientPresence;

  /**
   * Sets the avatar of the logged in client.
   * @param avatar The new avatar
   * @example
   * // Set avatar
   * client.user.setAvatar('./avatar.png')
   *   .then(user => console.log(`New avatar set!`))
   *   .catch(console.error);
   */
  public setAvatar(avatar: BufferResolvable | Base64Resolvable | null): Promise<this>;

  /**
   * Sets the full presence of the client user.
   * @param data Data for the presence
   * @example
   * // Set the client user's presence
   * client.user.setPresence({ activities: [{ name: 'with discord.js' }], status: 'idle' });
   */
  public setPresence(data: PresenceData): ClientPresence;

  /**
   * Sets the status of the client user.
   * @param status Status to change to
   * @param shardId Shard id(s) to have the activity set on
   * @example
   * // Set the client user's status
   * client.user.setStatus('idle');
   */
  public setStatus(status: PresenceStatusData, shardId?: number | number[]): ClientPresence;

  /**
   * Sets the username of the logged in client.
   * <info>Changing usernames in Discord is heavily rate limited, with only 2 requests
   * every hour. Use this sparingly!</info>
   * @param username The new username
   * @example
   * // Set username
   * client.user.setUsername('discordjs')
   *   .then(user => console.log(`My new username is ${user.username}`))
   *   .catch(console.error);
   */
  public setUsername(username: string): Promise<this>;
}

/**
 * Contains various utilities for client options.
 */
export class Options extends null {
  private constructor();

  /**
   * The default settings passed to {@link Options.cacheWithLimits}.
   * The caches that this changes are:
   * * `MessageManager` - Limit to 200 messages
   * * `ChannelManager` - Sweep archived threads
   * * `GuildChannelManager` - Sweep archived threads
   * * `ThreadManager` - Sweep archived threads
   * <info>If you want to keep default behavior and add on top of it you can use this object and add on to it, e.g.
   * `makeCache: Options.cacheWithLimits({ ...Options.defaultMakeCacheSettings, ReactionManager: 0 })`</info>
   */
  public static defaultMakeCacheSettings: CacheWithLimitsOptions;

  /**
   * The default settings passed to {@link Options.sweepers} (for v14).
   * The sweepers that this changes are:
   * * `threads` - Sweep archived threads every hour, removing those archived more than 4 hours ago
   * <info>If you want to keep default behavior and add on top of it you can use this object and add on to it, e.g.
   * `sweepers: { ...Options.defaultSweeperSettings, messages: { interval: 300, lifetime: 600 } })`</info>
   */
  public static defaultSweeperSettings: SweeperOptions;

  /**
   * The default client options.
   */
  public static createDefault(): ClientOptions;

  /**
   * Create a cache factory using predefined settings to sweep or limit.
   * @param settings Settings passed to the relevant constructor.
   * If no setting is provided for a manager, it uses Collection.
   * If a number is provided for a manager, it uses that number as the max size for a LimitedCollection.
   * If LimitedCollectionOptions are provided for a manager, it uses those settings to form a LimitedCollection.
   * @example
   * // Store up to 200 messages per channel and discard archived threads if they were archived more than 4 hours ago.
   * // Note archived threads will remain in the guild and client caches with these settings
   * Options.cacheWithLimits({
   *    MessageManager: 200,
   *    ThreadManager: {
   *      sweepInterval: 3600,
   *      sweepFilter: LimitedCollection.filterByLifetime({
   *        getComparisonTimestamp: e => e.archiveTimestamp,
   *        excludeFromSweep: e => !e.archived,
   *      }),
   *    },
   *  });
   * @example
   * // Sweep messages every 5 minutes, removing messages that have not been edited or created in the last 30 minutes
   * Options.cacheWithLimits({
   *   // Keep default thread sweeping behavior
   *   ...Options.defaultMakeCacheSettings,
   *   // Override MessageManager
   *   MessageManager: {
   *     sweepInterval: 300,
   *     sweepFilter: LimitedCollection.filterByLifetime({
   *       lifetime: 1800,
   *       getComparisonTimestamp: e => e.editedTimestamp ?? e.createdTimestamp,
   *     })
   *   }
   * });
   */
  public static cacheWithLimits(settings?: CacheWithLimitsOptions): CacheFactory;

  /**
   * Create a cache factory that always caches everything.
   */
  public static cacheEverything(): CacheFactory;
}

/**
 * Manages voice connections for the client
 */
export class ClientVoiceManager {
  public constructor(client: Client);

  /**
   * The client that instantiated this voice manager
   */
  public readonly client: Client;

  /**
   * Maps guild ids to voice adapters created for use with @discordjs/voice.
   */
  public adapters: Map<Snowflake, InternalDiscordGatewayAdapterLibraryMethods>;
}

export { Collection } from '@discordjs/collection';

export interface CollectorEventTypes<K, V, F extends unknown[] = []> {
  /**
   * Emitted whenever an element is collected/disposed of.
   * @param args The arguments emitted by the listener
   */
  collect: [V, ...F];

  /**
   * Emitted whenever an element is disposed of.
   * @param args The arguments emitted by the listener
   */
  dispose: [V, ...F];

  /**
   * Emitted when the collector is finished collecting.
   * @param collected The elements collected by the collector
   * @param reason The reason the collector ended
   */
  end: [collected: Collection<K, V>, reason: string];
}

/**
 * Abstract class for defining a new Collector.
 */
export abstract class Collector<K, V, F extends unknown[] = []> extends EventEmitter {
  public constructor(client: Client, options?: CollectorOptions<[V, ...F]>);

  /**
   * Timeout for cleanup
   */
  private _timeout: NodeJS.Timeout | null;

  /**
   * Timeout for cleanup due to inactivity
   */
  private _idletimeout: NodeJS.Timeout | null;

  /**
   * The client that instantiated this Collector
   */
  public readonly client: Client;

  /**
   * The items collected by this collector
   */
  public collected: Collection<K, V>;

  /**
   * Whether this collector has finished collecting
   */
  public ended: boolean;

  /**
   * The reason this collector has ended with, or null if it hasn't ended yet
   */
  public abstract readonly endReason: string | null;

  /**
   * The filter applied to this collector
   */
  public filter: CollectorFilter<[V, ...F]>;

  /**
   * Returns a promise that resolves with the next collected element;
   * rejects with collected elements if the collector finishes without receiving a next element
   */
  public readonly next: Promise<V>;

  /**
   * The options of this collector
   */
  public options: CollectorOptions<[V, ...F]>;

  /**
   * Checks whether the collector should end, and if so, ends it.
   * @returns Whether the collector ended or not
   */
  public checkEnd(): boolean;

  /**
   * Call this to handle an event as a collectable element. Accepts any event data as parameters.
   * @param args The arguments emitted by the listener
   * @emits Collector#collect
   */
  public handleCollect(...args: unknown[]): Promise<void>;

  /**
   * Call this to remove an element from the collection. Accepts any event data as parameters.
   * @param args The arguments emitted by the listener
   * @emits Collector#dispose
   */
  public handleDispose(...args: unknown[]): Promise<void>;

  /**
   * Stops this collector and emits the `end` event.
   * @param reason The reason this collector is ending
   * @emits Collector#end
   */
  public stop(reason?: string): void;

  /**
   * Resets the collector's timeout and idle timer.
   * @param options Options for resetting
   */
  public resetTimer(options?: CollectorResetTimerOptions): void;

  /**
   * Allows collectors to be consumed with for-await-of loops
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of}
   */
  public [Symbol.asyncIterator](): AsyncIterableIterator<V>;

  /**
   * Transforms the collector to a plain object.
   */
  public toJSON(): unknown;

  protected listener: (...args: any[]) => void;

  /**
   * Handles incoming events from the `handleCollect` function. Returns null if the event should not
   * be collected, or returns an object describing the data that should be stored.
   * @see {@link Collector.handleCollect}
   * @param args Any args the event listener emits
   * @returns Data to insert into collection, if any
   */
  public abstract collect(...args: unknown[]): K | null | Promise<K | null>;

  /**
   * Handles incoming events from the `handleDispose`. Returns null if the event should not
   * be disposed, or returns the key that should be removed.
   * @see {@link Collector.handleDispose}
   * @param args Any args the event listener emits
   * @returns Key to remove from the collection, if any
   */
  public abstract dispose(...args: unknown[]): K | null;

  public on<EventKey extends keyof CollectorEventTypes<K, V, F>>(
    event: EventKey,
    listener: (...args: CollectorEventTypes<K, V, F>[EventKey]) => Awaitable<void>,
  ): this;

  public once<EventKey extends keyof CollectorEventTypes<K, V, F>>(
    event: EventKey,
    listener: (...args: CollectorEventTypes<K, V, F>[EventKey]) => Awaitable<void>,
  ): this;
}

export interface ApplicationCommandInteractionOptionResolver<Cached extends CacheType = CacheType>
  extends CommandInteractionOptionResolver<Cached> {
  /**
   * Gets the selected subcommand.
   * @param required Whether to throw an error if there is no subcommand.
   * @returns The name of the selected subcommand, or null if not set and not required.
   */
  getSubcommand(required?: true): string;
  getSubcommand(required: boolean): string | null;

  /**
   * Gets the selected subcommand group.
   * @param required Whether to throw an error if there is no subcommand group.
   * @returns The name of the selected subcommand group, or null if not set and not required.
   */
  getSubcommandGroup(required?: true): string;
  getSubcommandGroup(required: boolean): string | null;

  /**
   * Gets a boolean option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getBoolean(name: string, required: true): boolean;
  getBoolean(name: string, required?: boolean): boolean | null;

  /**
   * Gets a channel option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getChannel(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['channel']>;
  getChannel(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['channel']> | null;

  /**
   * Gets a string option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getString(name: string, required: true): string;
  getString(name: string, required?: boolean): string | null;

  /**
   * Gets an integer option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getInteger(name: string, required: true): number;
  getInteger(name: string, required?: boolean): number | null;

  /**
   * Gets a number option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getNumber(name: string, required: true): number;
  getNumber(name: string, required?: boolean): number | null;

  /**
   * Gets a user option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getUser(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['user']>;
  getUser(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['user']> | null;

  /**
   * Gets a member option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getMember(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['member']>;
  getMember(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['member']> | null;

  /**
   * Gets a role option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getRole(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['role']>;
  getRole(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['role']> | null;

  /**
   * Gets a mentionable option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  getMentionable(
    name: string,
    required: true,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']>;
  getMentionable(
    name: string,
    required?: boolean,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']> | null;
}

/**
 * Represents a command interaction.
 */
export class CommandInteraction<Cached extends CacheType = CacheType> extends BaseCommandInteraction<Cached> {
  /**
   * The options passed to the command.
   */
  public options: Omit<CommandInteractionOptionResolver<Cached>, 'getMessage' | 'getFocused'>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is CommandInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is CommandInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is CommandInteraction<'raw'>;

  /**
   * Returns a string representation of the command interaction.
   * This can then be copied by a user and executed again in a new command while keeping the option order.
   */
  public toString(): string;
}

/**
 * Represents an autocomplete interaction.
 */
export class AutocompleteInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  /**
   * The invoked application command, if it was fetched before
   */
  public readonly command: ApplicationCommand | ApplicationCommand<{ guild: GuildResolvable }> | null;

  /**
   * The id of the channel this interaction was sent in
   */
  public channelId: Snowflake;

  /**
   * The invoked application command's id
   */
  public commandId: Snowflake;

  /**
   * The invoked application command's name
   */
  public commandName: string;

  /**
   * Whether this interaction has already received a response
   */
  public responded: boolean;

  /**
   * The options passed to the command
   */
  public options: Omit<CommandInteractionOptionResolver<Cached>, 'getMessage'>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is AutocompleteInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is AutocompleteInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is AutocompleteInteraction<'raw'>;

  /**
   * Transforms an option received from the API.
   * @param option The received option
   */
  private transformOption(option: APIApplicationCommandOption): CommandInteractionOption;

  /**
   * Sends results for the autocomplete of this interaction.
   * @param options The options for the autocomplete
   * @example
   * // respond to autocomplete interaction
   * interaction.respond([
   *  {
   *    name: 'Option 1',
   *    value: 'option1',
   *  },
   * ])
   *  .then(console.log)
   *  .catch(console.error);
   */
  public respond(options: ApplicationCommandOptionChoice[]): Promise<void>;
}

/**
 * A resolver for command interaction options.
 */
export class CommandInteractionOptionResolver<Cached extends CacheType = CacheType> {
  public constructor(client: Client, options: CommandInteractionOption[], resolved: CommandInteractionResolvedData);

  /**
   * The client that instantiated this.
   */
  public readonly client: Client;

  /**
   * The interaction options array.
   */
  public readonly data: readonly CommandInteractionOption<Cached>[];

  /**
   * The interaction resolved data
   */
  public readonly resolved: Readonly<CommandInteractionResolvedData<Cached>>;

  /**
   * The name of the subcommand group.
   */
  private _group: string | null;

  /**
   * The bottom-level options for the interaction.
   * If there is a subcommand (or subcommand and group), this is the options for the subcommand.
   */
  private _hoistedOptions: CommandInteractionOption<Cached>[];

  /**
   * The name of the subcommand.
   */
  private _subcommand: string | null;

  /**
   * Gets an option by name and property and checks its type.
   * @param name The name of the option.
   * @param type The type of the option.
   * @param properties The properties to check for for `required`.
   * @param required Whether to throw an error if the option is not found.
   * @returns The option, if found.
   */
  private _getTypedOption(
    name: string,
    type: ApplicationCommandOptionType,
    properties: (keyof ApplicationCommandOption)[],
    required: true,
  ): CommandInteractionOption<Cached>;
  private _getTypedOption(
    name: string,
    type: ApplicationCommandOptionType,
    properties: (keyof ApplicationCommandOption)[],
    required: boolean,
  ): CommandInteractionOption<Cached> | null;

  /**
   * Gets the selected subcommand.
   * @param required Whether to throw an error if there is no subcommand.
   * @returns The name of the selected subcommand, or null if not set and not required.
   */
  public get(name: string, required: true): CommandInteractionOption<Cached>;
  public get(name: string, required?: boolean): CommandInteractionOption<Cached> | null;

  /**
   * Gets the selected subcommand.
   * @param required Whether to throw an error if there is no subcommand.
   * @returns The name of the selected subcommand, or null if not set and not required.
   */
  public getSubcommand(required?: true): string;
  public getSubcommand(required: boolean): string | null;

  /**
   * Gets the selected subcommand group.
   * @param required Whether to throw an error if there is no subcommand group.
   * @returns The name of the selected subcommand group, or null if not set and not required.
   */
  public getSubcommandGroup(required?: true): string;
  public getSubcommandGroup(required: boolean): string | null;

  /**
   * Gets a boolean option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getBoolean(name: string, required: true): boolean;
  public getBoolean(name: string, required?: boolean): boolean | null;

  /**
   * Gets a channel option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getChannel(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['channel']>;
  public getChannel(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['channel']> | null;

  /**
   * Gets a string option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getString(name: string, required: true): string;
  public getString(name: string, required?: boolean): string | null;

  /**
   * Gets an integer option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getInteger(name: string, required: true): number;
  public getInteger(name: string, required?: boolean): number | null;

  /**
   * Gets a number option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getNumber(name: string, required: true): number;
  public getNumber(name: string, required?: boolean): number | null;

  /**
   * Gets a user option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getUser(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['user']>;
  public getUser(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['user']> | null;

  /**
   * Gets a member option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getMember(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['member']>;
  public getMember(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['member']> | null;

  /**
   * Gets a role option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getRole(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['role']>;
  public getRole(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['role']> | null;

  /**
   * Gets a mentionable option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getMentionable(
    name: string,
    required: true,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']>;
  public getMentionable(
    name: string,
    required?: boolean,
  ): NonNullable<CommandInteractionOption<Cached>['member' | 'role' | 'user']> | null;

  /**
   * Gets a message option.
   * @param name The name of the option.
   * @param required Whether to throw an error if the option is not found.
   * @returns The value of the option, or null if not set and not required.
   */
  public getMessage(name: string, required: true): NonNullable<CommandInteractionOption<Cached>['message']>;
  public getMessage(name: string, required?: boolean): NonNullable<CommandInteractionOption<Cached>['message']> | null;

  /**
   * Gets the focused option.
   * @param getFull Whether to get the full option object
   * @returns The value of the option, or the whole option if getFull is true
   */
  public getFocused(getFull: true): ApplicationCommandOptionChoice;
  public getFocused(getFull?: boolean): string | number;
}

/**
 * Represents a context menu interaction.
 */
export class ContextMenuInteraction<Cached extends CacheType = CacheType> extends BaseCommandInteraction<Cached> {
  /**
   * The target of the interaction, parsed into options
   */
  public options: Omit<
    CommandInteractionOptionResolver<Cached>,
    | 'getFocused'
    | 'getMentionable'
    | 'getRole'
    | 'getNumber'
    | 'getInteger'
    | 'getString'
    | 'getChannel'
    | 'getBoolean'
    | 'getSubcommandGroup'
    | 'getSubcommand'
  >;

  /**
   * The id of the target of the interaction
   */
  public targetId: Snowflake;

  /**
   * The type of the target of the interaction
   */
  public targetType: Exclude<ApplicationCommandType, 'CHAT_INPUT'>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is ContextMenuInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is ContextMenuInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is ContextMenuInteraction<'raw'>;

  /**
   * Resolves and transforms options received from the API for a context menu interaction.
   * @param data The interaction data
   */
  private resolveContextMenuOptions(data: APIApplicationCommandInteractionData): CommandInteractionOption<Cached>[];
}

/**
 * The DataResolver identifies different objects and tries to resolve a specific piece of information from them.
 */
export class DataResolver extends null {
  private constructor();

  /**
   * Resolves a Base64Resolvable to a Base 64 image.
   * @param data The base 64 resolvable you want to resolve
   */
  public static resolveBase64(data: Base64Resolvable): string;

  /**
   * Resolves the string to a code based on the passed regex.
   * @param data The string to resolve
   * @param regex The RegExp used to extract the code
   */
  public static resolveCode(data: string, regx: RegExp): string;

  /**
   * Resolves a BufferResolvable to a Buffer or a Stream.
   * @param resource The buffer or stream resolvable to resolve
   */
  public static resolveFile(resource: BufferResolvable | Stream): Promise<Buffer | Stream>;

  /**
   * Resolves a BufferResolvable to a Buffer.
   * @param resource The buffer or stream resolvable to resolve
   */
  public static resolveFileAsBuffer(resource: BufferResolvable | Stream): Promise<Buffer>;

  /**
   * Resolves a Base64Resolvable, a string, or a BufferResolvable to a Base 64 image.
   * @param image The image to be resolved
   */
  public static resolveImage(resource: BufferResolvable | Base64Resolvable): Promise<string | null>;

  /**
   * Resolves InviteResolvable to an invite code.
   * @param data The invite resolvable to resolve
   */
  public static resolveInviteCode(data: InviteResolvable): string;

  /**
   * Resolves GuildTemplateResolvable to a template code.
   * @param data The template resolvable to resolve
   */
  public static resolveGuildTemplateCode(data: GuildTemplateResolvable): string;
}

/**
 * Represents an error from the Discord API.
 */
export class DiscordAPIError extends Error {
  public constructor(error: unknown, status: number, request: unknown);

  /**
   * Flattens an errors object returned from the API into an array.
   * @param obj Discord errors object
   * @param key Used internally to determine key names of nested fields
   */
  private static flattenErrors(obj: unknown, key: string): string[];

  /**
   * HTTP error code returned by Discord
   */
  public code: number;

  /**
   * The HTTP method used for the request
   */
  public method: string;

  /**
   * The path of the request relative to the HTTP endpoint
   */
  public path: string;

  /**
   * The HTTP status code
   */
  public httpStatus: number;

  /**
   * The data associated with the request that caused this error
   */
  public requestData: HTTPErrorData;
}

/**
 * Represents a direct message channel between two users.
 */
export class DMChannel extends TextBasedChannelMixin(Channel, ['bulkDelete']) {
  /**
   * @param client The instantiating client
   * @param data The data for the DM channel
   */
  public constructor(client: Client, data?: RawDMChannelData);

  /**
   * A manager of the messages belonging to this channel
   */
  public messages: MessageManager;

  /**
   * The recipient on the other end of the DM
   */
  public recipient: User;

  /**
   * The type of the channel
   */
  public type: 'DM';

  /**
   * Fetch this DMChannel.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<this>;
}

/**
 * Represents an emoji, see {@link GuildEmoji} and {@link ReactionEmoji}.
 */
export class Emoji extends Base {
  public constructor(client: Client, emoji: RawEmojiData);

  /**
   * Whether or not the emoji is animated
   */
  public animated: boolean | null;

  /**
   * The time the emoji was created at, or null if unicode
   */
  public readonly createdAt: Date | null;

  /**
   * The timestamp the emoji was created at, or null if unicode
   */
  public readonly createdTimestamp: number | null;

  /**
   * Whether this emoji has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The emoji's id
   */
  public id: Snowflake | null;

  /**
   * The emoji's name
   */
  public name: string | null;

  /**
   * The identifier of this emoji, used for message reactions
   */
  public readonly identifier: string;

  /**
   * The URL to the emoji file if it's a custom emoji
   */
  public readonly url: string | null;

  /**
   * Transforms the emoji to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the text required to form a graphical emoji on Discord
   * instead of the Emoji object.
   * @example
   * // Send a custom emoji from a guild:
   * const emoji = guild.emojis.cache.first();
   * msg.channel.send(`Hello! ${emoji}`);
   * @example
   * // Send the emoji used in a reaction to the channel the reaction is part of
   * reaction.message.channel.send(`The emoji used was: ${reaction.emoji}`);
   */
  public toString(): string;
}

/**
 * Represents a guild (or a server) on Discord.
 * <info>It's recommended to see if a guild is available before performing operations or reading data from it. You can
 * check this with {@link Guild.available}.</info>
 */
export class Guild extends AnonymousGuild {
  public constructor(client: Client, data: RawGuildData);

  /**
   * Creates a collection of this guild's roles, sorted by their position and ids.
   */
  private _sortedRoles(): Collection<Snowflake, Role>;

  /**
   * Creates a collection of this guild's or a specific category's channels, sorted by their position and ids.
   * @param channel Category to get the channels of
   */
  private _sortedChannels(channel: NonThreadGuildBasedChannel): Collection<Snowflake, NonThreadGuildBasedChannel>;

  /**
   * The id of the voice channel where AFK members are moved
   */
  public readonly afkChannel: VoiceChannel | null;

  /**
   * The id of the voice channel where AFK members are moved
   */
  public afkChannelId: Snowflake | null;

  /**
   * The time in seconds before a user is counted as "away from keyboard"
   */
  public afkTimeout: number;

  /**
   * The id of the application that created this guild (if applicable)
   */
  public applicationId: Snowflake | null;

  /**
   * The approximate amount of members the guild has
   * <info>You will need to fetch the guild using {@link Guild.fetch} if you want to receive this parameter</info>
   */
  public approximateMemberCount: number | null;

  /**
   * The approximate amount of presences the guild has
   * <info>You will need to fetch the guild using {@link Guild.fetch} if you want to receive this parameter</info>
   */
  public approximatePresenceCount: number | null;

  /**
   * Whether the guild is available to access. If it is not available, it indicates a server outage
   */
  public available: boolean;

  /**
   * A manager of the bans belonging to this guild
   */
  public bans: GuildBanManager;

  /**
   * A manager of the channels belonging to this guild
   */
  public channels: GuildChannelManager;

  /**
   * A manager of the application commands belonging to this guild
   */
  public commands: GuildApplicationCommandManager;

  /**
   * The default message notification level of the guild
   */
  public defaultMessageNotifications: DefaultMessageNotificationLevel | number;

  /**
   * Whether the bot has been removed from the guild
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The hash of the guild discovery splash image
   */
  public discoverySplash: string | null;

  /**
   * A manager of the emojis belonging to this guild
   */
  public emojis: GuildEmojiManager;

  /**
   * The explicit content filter level of the guild
   */
  public explicitContentFilter: ExplicitContentFilterLevel;

  /**
   * A manager of the invites of this guild
   */
  public invites: GuildInviteManager;

  /**
   * The time the client user joined the guild
   */
  public readonly joinedAt: Date;

  /**
   * The timestamp the client user joined the guild at
   */
  public joinedTimestamp: number;

  /**
   * Whether the guild is "large" (has more than {@link WebsocketOptions large_threshold} members, 50 by default)
   */
  public large: boolean;

  /**
   * The maximum amount of members the guild can have
   */
  public maximumMembers: number | null;

  /**
   * The maximum amount of presences the guild can have
   * <info>You will need to fetch the guild using {@link Guild.fetch} if you want to receive this parameter</info>
   */
  public maximumPresences: number | null;

  /**
   * The client user as a GuildMember of this guild
   */
  public readonly me: GuildMember | null;

  /**
   * The full amount of members in this guild
   */
  public memberCount: number;

  /**
   * A manager of the members belonging to this guild
   */
  public members: GuildMemberManager;

  /**
   * The required MFA level for this guild
   */
  public mfaLevel: MFALevel;

  /**
   * The user id of this guild's owner
   */
  public ownerId: Snowflake;

  /**
   * The preferred locale of the guild, defaults to `en-US`
   * @see {@link [Accepted Locales](https://discord.com/developers/docs/dispatch/field-values#predefined-field-values-accepted-locales)}
   */
  public preferredLocale: string;

  /**
   * The total number of boosts for this server
   */
  public premiumSubscriptionCount: number | null;

  /**
   * Whether this guild has its premium (boost) progress bar enabled
   */
  public premiumProgressBarEnabled: boolean;

  /**
   * The premium tier of this guild
   */
  public premiumTier: PremiumTier;

  /**
   * A manager of the presences belonging to this guild
   */
  public presences: PresenceManager;

  /**
   * Public updates channel for this guild
   */
  public readonly publicUpdatesChannel: TextChannel | null;

  /**
   * The community updates channel's id for the guild
   */
  public publicUpdatesChannelId: Snowflake | null;

  /**
   * A manager of the roles belonging to this guild
   */
  public roles: RoleManager;

  /**
   * Rules channel for this guild
   */
  public readonly rulesChannel: TextChannel | null;

  /**
   * The rules channel's id for the guild
   */
  public rulesChannelId: Snowflake | null;

  /**
   * A manager of the scheduled events of this guild
   */
  public scheduledEvents: GuildScheduledEventManager;

  /**
   * The Shard this Guild belongs to.
   */
  public readonly shard: WebSocketShard;

  /**
   * The id of the shard this Guild belongs to.
   */
  public shardId: number;

  /**
   * A manager of the stage instances of this guild
   */
  public stageInstances: StageInstanceManager;

  /**
   * A manager of the stickers belonging to this guild
   */
  public stickers: GuildStickerManager;

  /**
   * System channel for this guild
   */
  public readonly systemChannel: TextChannel | null;

  /**
   * The value set for the guild's system channel flags
   */
  public systemChannelFlags: Readonly<SystemChannelFlags>;

  /**
   * The system channel's id
   */
  public systemChannelId: Snowflake | null;

  /**
   * The use count of the vanity URL code of the guild, if any
   * <info>You will need to fetch this parameter using {@link Guild.fetchVanityData} if you want to receive it</info>
   */
  public vanityURLUses: number | null;

  /**
   * The voice state adapter for this guild that can be used with @discordjs/voice to play audio in voice
   * and stage channels.
   */
  public readonly voiceAdapterCreator: InternalDiscordGatewayAdapterCreator;

  /**
   * A manager of the voice states of this guild
   */
  public readonly voiceStates: VoiceStateManager;

  /**
   * Widget channel for this guild
   */
  public readonly widgetChannel: TextChannel | null;

  /**
   * The widget channel's id, if enabled
   */
  public widgetChannelId: Snowflake | null;

  /**
   * Whether widget images are enabled on this guild
   */
  public widgetEnabled: boolean | null;

  /**
   * The maximum bitrate available for this guild
   */
  public readonly maximumBitrate: number;

  /**
   * Creates a template for the guild.
   * @param name The name for the template
   * @param description The description for the template
   */
  public createTemplate(name: string, description?: string): Promise<GuildTemplate>;

  /**
   * Deletes the guild.
   * @example
   * // Delete a guild
   * guild.delete()
   *   .then(g => console.log(`Deleted the guild ${g}`))
   *   .catch(console.error);
   */
  public delete(): Promise<Guild>;

  /**
   * The URL to this guild's discovery splash image.
   * @param options Options for the Image URL
   */
  public discoverySplashURL(options?: StaticImageURLOptions): string | null;

  /**
   * Updates the guild with new information - e.g. a new name.
   * @param data The data to update the guild with
   * @param reason Reason for editing this guild
   * @example
   * // Set the guild name
   * guild.edit({
   *   name: 'Discord Guild',
   * })
   *   .then(updated => console.log(`New guild name ${updated}`))
   *   .catch(console.error);
   */
  public edit(data: GuildEditData, reason?: string): Promise<Guild>;

  /**
   * Updates the guild's welcome screen
   * @param data Data to edit the welcome screen with
   * @example
   * guild.editWelcomeScreen({
   *   description: 'Hello World',
   *   enabled: true,
   *   welcomeChannels: [
   *     {
   *       description: 'foobar',
   *       channel: '222197033908436994',
   *     }
   *   ],
   * })
   */
  public editWelcomeScreen(data: WelcomeScreenEditData): Promise<WelcomeScreen>;

  /**
   * Whether this guild equals another guild. It compares all properties, so for most operations
   * it is advisable to just compare `guild.id === guild2.id` as it is much faster and is often
   * what most users need.
   * @param guild The guild to compare with
   */
  public equals(guild: Guild): boolean;

  /**
   * Fetches audit logs for this guild.
   * @param options Options for fetching audit logs
   * @example
   * // Output audit log entries
   * guild.fetchAuditLogs()
   *   .then(audit => console.log(audit.entries.first()))
   *   .catch(console.error);
   */
  public fetchAuditLogs<T extends GuildAuditLogsResolvable = 'ALL'>(
    options?: GuildAuditLogsFetchOptions<T>,
  ): Promise<GuildAuditLogs<T>>;

  /**
   * Fetches a collection of integrations to this guild.
   * Resolves with a collection mapping integrations by their ids.
   * @example
   * // Fetch integrations
   * guild.fetchIntegrations()
   *   .then(integrations => console.log(`Fetched ${integrations.size} integrations`))
   *   .catch(console.error);
   */
  public fetchIntegrations(): Promise<Collection<Snowflake | string, Integration>>;

  /**
   * Fetches the owner of the guild.
   * If the member object isn't needed, use {@link Guild.ownerId} instead.
   * @param options The options for fetching the member
   */
  public fetchOwner(options?: BaseFetchOptions): Promise<GuildMember>;

  /**
   * Obtains a guild preview for this guild from Discord.
   */
  public fetchPreview(): Promise<GuildPreview>;

  /**
   * Fetches a collection of templates from this guild.
   * Resolves with a collection mapping templates by their codes.
   */
  public fetchTemplates(): Promise<Collection<GuildTemplate['code'], GuildTemplate>>;

  /**
   * Fetches the vanity URL invite object to this guild.
   * Resolves with an object containing the vanity URL invite code and the use count
   * @example
   * // Fetch invite data
   * guild.fetchVanityData()
   *   .then(res => {
   *     console.log(`Vanity URL: https://discord.gg/${res.code} with ${res.uses} uses`);
   *   })
   *   .catch(console.error);
   */
  public fetchVanityData(): Promise<Vanity>;

  /**
   * Fetches all webhooks for the guild.
   * @example
   * // Fetch webhooks
   * guild.fetchWebhooks()
   *   .then(webhooks => console.log(`Fetched ${webhooks.size} webhooks`))
   *   .catch(console.error);
   */
  public fetchWebhooks(): Promise<Collection<Snowflake, Webhook>>;

  /**
   * Fetches the welcome screen for this guild.
   */
  public fetchWelcomeScreen(): Promise<WelcomeScreen>;

  /**
   * Fetches the guild widget data, requires the widget to be enabled.
   * @example
   * // Fetches the guild widget data
   * guild.fetchWidget()
   *   .then(widget => console.log(`The widget shows ${widget.channels.size} channels`))
   *   .catch(console.error);
   */
  public fetchWidget(): Promise<Widget>;

  /**
   * Fetches the guild widget settings.
   * @example
   * // Fetches the guild widget settings
   * guild.fetchWidgetSettings()
   *   .then(widget => console.log(`The widget is ${widget.enabled ? 'enabled' : 'disabled'}`))
   *   .catch(console.error);
   */
  public fetchWidgetSettings(): Promise<GuildWidgetSettings>;

  /**
   * Leaves the guild.
   * @example
   * // Leave a guild
   * guild.leave()
   *   .then(g => console.log(`Left the guild ${g}`))
   *   .catch(console.error);
   */
  public leave(): Promise<Guild>;

  /**
   * Edits the AFK channel of the guild.
   * @param afkChannel The new AFK channel
   * @param reason Reason for changing the guild's AFK channel
   * @example
   * // Edit the guild AFK channel
   * guild.setAFKChannel(channel)
   *  .then(updated => console.log(`Updated guild AFK channel to ${guild.afkChannel.name}`))
   *  .catch(console.error);
   */
  public setAFKChannel(afkChannel: VoiceChannelResolvable | null, reason?: string): Promise<Guild>;

  /**
   * Edits the AFK timeout of the guild.
   * @param afkTimeout The time in seconds that a user must be idle to be considered AFK
   * @param reason Reason for changing the guild's AFK timeout
   * @example
   * // Edit the guild AFK channel
   * guild.setAFKTimeout(60)
   *  .then(updated => console.log(`Updated guild AFK timeout to ${guild.afkTimeout}`))
   *  .catch(console.error);
   */
  public setAFKTimeout(afkTimeout: number, reason?: string): Promise<Guild>;

  /**
   * Sets a new guild banner.
   * @param banner The new banner of the guild
   * @param reason Reason for changing the guild's banner
   * @example
   * guild.setBanner('./banner.png')
   *  .then(updated => console.log('Updated the guild banner'))
   *  .catch(console.error);
   */
  public setBanner(banner: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;

  /**
   * Batch-updates the guild's channels' positions.
   * <info>Only one channel's parent can be changed at a time</info>
   * @param channelPositions Channel positions to update
   * @deprecated Use {@link GuildChannelManager.setPositions} instead
   * @example
   * guild.setChannelPositions([{ channel: channelId, position: newChannelIndex }])
   *   .then(guild => console.log(`Updated channel positions for ${guild}`))
   *   .catch(console.error);
   */
  public setChannelPositions(channelPositions: readonly ChannelPosition[]): Promise<Guild>;

  /**
   * Edits the setting of the default message notifications of the guild.
   * @param defaultMessageNotifications The new default message notification level of the guild
   * @param reason Reason for changing the setting of the default message notifications
   */
  public setDefaultMessageNotifications(
    defaultMessageNotifications: DefaultMessageNotificationLevel | number,
    reason?: string,
  ): Promise<Guild>;

  /**
   * Sets a new guild discovery splash image.
   * @param discoverySplash The new discovery splash image of the guild
   * @param reason Reason for changing the guild's discovery splash image
   * @example
   * // Edit the guild discovery splash
   * guild.setDiscoverySplash('./discoverysplash.png')
   *   .then(updated => console.log('Updated the guild discovery splash'))
   *   .catch(console.error);
   */
  public setDiscoverySplash(
    discoverySplash: BufferResolvable | Base64Resolvable | null,
    reason?: string,
  ): Promise<Guild>;

  /**
   * Edits the level of the explicit content filter.
   * @param explicitContentFilter The new level of the explicit content filter
   * @param reason Reason for changing the level of the guild's explicit content filter
   */
  public setExplicitContentFilter(
    explicitContentFilter: ExplicitContentFilterLevel | number,
    reason?: string,
  ): Promise<Guild>;

  /**
   * Sets a new guild icon.
   * @param icon The new icon of the guild
   * @param reason Reason for changing the guild's icon
   * @example
   * // Edit the guild icon
   * guild.setIcon('./icon.png')
   *  .then(updated => console.log('Updated the guild icon'))
   *  .catch(console.error);
   */
  public setIcon(icon: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;

  /**
   * Edits the name of the guild.
   * @param name The new name of the guild
   * @param reason Reason for changing the guild's name
   * @example
   * // Edit the guild name
   * guild.setName('Discord Guild')
   *  .then(updated => console.log(`Updated guild name to ${updated.name}`))
   *  .catch(console.error);
   */
  public setName(name: string, reason?: string): Promise<Guild>;

  /**
   * Sets a new owner of the guild.
   * @param owner The new owner of the guild
   * @param reason Reason for setting the new owner
   * @example
   * // Edit the guild owner
   * guild.setOwner(guild.members.cache.first())
   *  .then(guild => guild.fetchOwner())
   *  .then(owner => console.log(`Updated the guild owner to ${owner.displayName}`))
   *  .catch(console.error);
   */
  public setOwner(owner: GuildMemberResolvable, reason?: string): Promise<Guild>;

  /**
   * Edits the preferred locale of the guild.
   * @param preferredLocale The new preferred locale of the guild
   * @param reason Reason for changing the guild's preferred locale
   * @example
   * // Edit the guild preferred locale
   * guild.setPreferredLocale('en-US')
   *  .then(updated => console.log(`Updated guild preferred locale to ${guild.preferredLocale}`))
   *  .catch(console.error);
   */
  public setPreferredLocale(preferredLocale: string, reason?: string): Promise<Guild>;

  /**
   * Edits the community updates channel of the guild.
   * @param publicUpdatesChannel The new community updates channel
   * @param reason Reason for changing the guild's community updates channel
   * @example
   * // Edit the guild community updates channel
   * guild.setPublicUpdatesChannel(channel)
   *  .then(updated => console.log(`Updated guild community updates channel to ${guild.publicUpdatesChannel.name}`))
   *  .catch(console.error);
   */
  public setPublicUpdatesChannel(publicUpdatesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;

  /**
   * Batch-updates the guild's role positions
   * @param rolePositions Role positions to update
   * @deprecated Use {@link RoleManager.setPositions} instead
   * @example
   * guild.setRolePositions([{ role: roleId, position: updatedRoleIndex }])
   *  .then(guild => console.log(`Role positions updated for ${guild}`))
   *  .catch(console.error);
   */
  public setRolePositions(rolePositions: readonly RolePosition[]): Promise<Guild>;

  /**
   * Edits the rules channel of the guild.
   * @param rulesChannel The new rules channel
   * @param reason Reason for changing the guild's rules channel
   * @example
   * // Edit the guild rules channel
   * guild.setRulesChannel(channel)
   *  .then(updated => console.log(`Updated guild rules channel to ${guild.rulesChannel.name}`))
   *  .catch(console.error);
   */
  public setRulesChannel(rulesChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;

  /**
   * Sets a new guild invite splash image.
   * @param splash The new invite splash image of the guild
   * @param reason Reason for changing the guild's invite splash image
   * @example
   * // Edit the guild splash
   * guild.setSplash('./splash.png')
   *  .then(updated => console.log('Updated the guild splash'))
   *  .catch(console.error);
   */
  public setSplash(splash: BufferResolvable | Base64Resolvable | null, reason?: string): Promise<Guild>;

  /**
   * Edits the system channel of the guild.
   * @param systemChannel The new system channel
   * @param reason Reason for changing the guild's system channel
   * @example
   * // Edit the guild system channel
   * guild.setSystemChannel(channel)
   *  .then(updated => console.log(`Updated guild system channel to ${guild.systemChannel.name}`))
   *  .catch(console.error);
   */
  public setSystemChannel(systemChannel: TextChannelResolvable | null, reason?: string): Promise<Guild>;

  /**
   * Edits the flags of the default message notifications of the guild.
   * @param systemChannelFlags The new flags for the default message notifications
   * @param reason Reason for changing the flags of the default message notifications
   */
  public setSystemChannelFlags(systemChannelFlags: SystemChannelFlagsResolvable, reason?: string): Promise<Guild>;

  /**
   * Edits the verification level of the guild.
   * @param verificationLevel The new verification level of the guild
   * @param reason Reason for changing the guild's verification level
   * @example
   * // Edit the guild verification level
   * guild.setVerificationLevel(1)
   *  .then(updated => console.log(`Updated guild verification level to ${guild.verificationLevel}`))
   *  .catch(console.error);
   */
  public setVerificationLevel(verificationLevel: VerificationLevel | number, reason?: string): Promise<Guild>;

  /**
   * Edits the enabled state of the guild's premium progress bar
   * @param enabled The new enabled state of the guild's premium progress bar
   * @param reason Reason for changing the state of the guild's premium progress bar
   */
  public setPremiumProgressBarEnabled(enabled?: boolean, reason?: string): Promise<Guild>;

  /**
   * Edits the guild's widget settings.
   * @param settings The widget settings for the guild
   * @param reason Reason for changing the guild's widget settings
   */
  public setWidgetSettings(settings: GuildWidgetSettingsData, reason?: string): Promise<Guild>;

  /**
   * Transforms the guild to a plain object.
   */
  public toJSON(): unknown;
}

export class GuildAuditLogs<T extends GuildAuditLogsResolvable = 'ALL'> {
  public constructor(guild: Guild, data: RawGuildAuditLogData);

  /**
   * Cached webhooks
   */
  private webhooks: Collection<Snowflake, Webhook>;

  /**
   * Cached integrations
   */
  private integrations: Collection<Snowflake | string, Integration>;

  /**
   * The entries for this guild's audit logs
   */
  public entries: Collection<Snowflake, GuildAuditLogsEntry<T>>;

  /**
   * All available actions keyed under their names to their numeric values.
   */
  public static Actions: GuildAuditLogsActions;

  /**
   * Key mirror of all available audit log targets.
   */
  public static Targets: GuildAuditLogsTargets;

  /**
   * Audit logs entry.
   */
  public static Entry: typeof GuildAuditLogsEntry;

  /**
   * Finds the action type from the entry action.
   * @param action The action target
   */
  public static actionType(action: number): GuildAuditLogsActionType;

  /**
   * Handles possible promises for entry targets.
   */
  public static build(...args: unknown[]): Promise<GuildAuditLogs>;

  /**
   * Finds the target type from the entry action.
   * @param target The action target
   */
  public static targetType(target: number): GuildAuditLogsTarget;

  /**
   * Transforms the audit logs to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Audit logs entry.
 */
export class GuildAuditLogsEntry<
  TActionRaw extends GuildAuditLogsResolvable = 'ALL',
  TAction = TActionRaw extends keyof GuildAuditLogsIds
    ? GuildAuditLogsIds[TActionRaw]
    : TActionRaw extends null
    ? 'ALL'
    : TActionRaw,
  TActionType extends GuildAuditLogsActionType = TAction extends keyof GuildAuditLogsTypes
    ? GuildAuditLogsTypes[TAction][1]
    : 'ALL',
  TTargetType extends GuildAuditLogsTarget = TAction extends keyof GuildAuditLogsTypes
    ? GuildAuditLogsTypes[TAction][0]
    : 'UNKNOWN',
> {
  public constructor(logs: GuildAuditLogs, guild: Guild, data: RawGuildAuditLogEntryData);

  /**
   * Specific action type of this entry in its string presentation
   */
  public action: TAction;

  /**
   * The action type of this entry
   */
  public actionType: TActionType;

  /**
   * Specific property changes
   */
  public changes: AuditLogChange[] | null;

  /**
   * The time this entry was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp this entry was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The user that executed this entry
   */
  public executor: User | null;

  /**
   * Any extra data from the entry
   */
  public extra: TAction extends keyof GuildAuditLogsEntryExtraField ? GuildAuditLogsEntryExtraField[TAction] : null;

  /**
   * The entry's id
   */
  public id: Snowflake;

  /**
   * The reason of this entry
   */
  public reason: string | null;

  /**
   * The target of this entry
   */
  public target: TTargetType extends keyof GuildAuditLogsEntryTargetField<TActionType>
    ? GuildAuditLogsEntryTargetField<TActionType>[TTargetType]
    : Role | GuildEmoji | { id: Snowflake } | null;

  /**
   * The target type of this entry
   */
  public targetType: TTargetType;

  /**
   * Transforms the audit log entry to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Represents a ban in a guild on Discord.
 */
export class GuildBan extends Base {
  /**
   * @param client The instantiating client
   * @param data The data for the ban
   * @param guild The guild in which the ban is
   */
  public constructor(client: Client, data: RawGuildBanData, guild: Guild);

  /**
   * The guild in which the ban is
   */
  public guild: Guild;

  /**
   * The user this ban applies to
   */
  public user: User;

  /**
   * Whether this GuildBan is partial. If the reason is not provided the value is null
   */
  public readonly partial: boolean;

  /**
   * The reason for the ban
   */
  public reason?: string | null;

  /**
   * Fetches this GuildBan.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<GuildBan>;
}

/**
 * Represents a guild channel from any of the following:
 * - {@link TextChannel}
 * - {@link VoiceChannel}
 * - {@link CategoryChannel}
 * - {@link NewsChannel}
 * - {@link StoreChannel}
 * - {@link StageChannel}
 */
export class GuildChannel extends Channel {
  /**
   * @param guild The guild the guild channel is part of
   * @param data The data for the guild channel
   * @param client A safety parameter for the client that instantiated this
   * @param immediatePatch Control variable for patching
   */
  public constructor(guild: Guild, data?: RawGuildChannelData, client?: Client, immediatePatch?: boolean);

  /**
   * Gets the overall set of permissions for a member in this channel, taking into account channel overwrites.
   * @param member The member to obtain the overall permissions for
   * @param checkAdmin Whether having `ADMINISTRATOR` will return all permissions
   */
  private memberPermissions(member: GuildMember, checkAdmin: boolean): Readonly<Permissions>;

  /**
   * Gets the overall set of permissions for a role in this channel, taking into account channel overwrites.
   * @param role The role to obtain the overall permissions for
   * @param checkAdmin Whether having `ADMINISTRATOR` will return all permissions
   */
  private rolePermissions(role: Role, checkAdmin: boolean): Readonly<Permissions>;

  public readonly calculatedPosition: number;

  /**
   * Whether the channel is deletable by the client user
   */
  public readonly deletable: boolean;

  /**
   * The guild the channel is in
   */
  public guild: Guild;

  /**
   * The id of the guild the channel is in
   */
  public guildId: Snowflake;

  /**
   * Whether the channel is manageable by the client user
   */
  public readonly manageable: boolean;

  /**
   * A collection of cached members of this channel, mapped by their ids.
   * Members that can view this channel, if the channel is text-based.
   * Members in the channel, if the channel is voice-based.
   */
  public readonly members: Collection<Snowflake, GuildMember>;

  /**
   * The name of the guild channel
   */
  public name: string;

  /**
   * The category parent of this channel
   */
  public readonly parent: CategoryChannel | null;

  /**
   * The id of the category parent of this channel
   */
  public parentId: Snowflake | null;

  /**
   * A manager of permission overwrites that belong to this channel
   */
  public permissionOverwrites: PermissionOverwriteManager;

  /**
   * If the permissionOverwrites match the parent channel, null if no parent
   */
  public readonly permissionsLocked: boolean | null;

  /**
   * The position of the channel
   */
  public readonly position: number;

  /**
   * The raw position of the channel from Discord
   */
  public rawPosition: number;

  /**
   * The type of the channel
   */
  public type: Exclude<keyof typeof ChannelTypes, 'DM' | 'GROUP_DM' | 'UNKNOWN'>;

  /**
   * Whether the channel is viewable by the client user
   */
  public readonly viewable: boolean;

  /**
   * Clones this channel.
   * @param options The options for cloning this channel
   */
  public clone(options?: GuildChannelCloneOptions): Promise<this>;

  /**
   * Deletes this channel.
   * @param reason Reason for deleting this channel
   * @example
   * // Delete the channel
   * channel.delete('making room for new channels')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public delete(reason?: string): Promise<this>;

  /**
   * Edits the channel.
   * @param data The new data for the channel
   * @param reason Reason for editing this channel
   * @example
   * // Edit a channel
   * channel.edit({ name: 'new-channel' })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public edit(data: ChannelData, reason?: string): Promise<this>;

  /**
   * Checks if this channel has the same type, topic, position, name, overwrites, and id as another channel.
   * In most cases, a simple `channel.id === channel2.id` will do, and is much faster too.
   * @param channel Channel to compare with
   */
  public equals(channel: GuildChannel): boolean;

  /**
   * Locks in the permission overwrites from the parent channel.
   */
  public lockPermissions(): Promise<this>;

  /**
   * Gets the overall set of permissions for a member or role in this channel, taking into account channel overwrites.
   * @param memberOrRole The member or role to obtain the overall permissions for
   * @param checkAdmin Whether having `ADMINISTRATOR` will return all permissions
   */
  public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<Permissions>;
  public permissionsFor(
    memberOrRole: GuildMemberResolvable | RoleResolvable,
    checkAdmin?: boolean,
  ): Readonly<Permissions> | null;

  /**
   * Sets a new name for the guild channel.
   * @param name The new name for the guild channel
   * @param reason Reason for changing the guild channel's name
   * @example
   * // Set a new channel name
   * channel.setName('not_general')
   *   .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`))
   *   .catch(console.error);
   */
  public setName(name: string, reason?: string): Promise<this>;

  /**
   * Sets the parent of this channel.
   * @param channel The category channel to set as the parent
   * @param options The options for setting the parent
   * @example
   * // Add a parent to a channel
   * message.channel.setParent('355908108431917066', { lockPermissions: false })
   *   .then(channel => console.log(`New parent of ${message.channel.name}: ${channel.name}`))
   *   .catch(console.error);
   */
  public setParent(channel: CategoryChannelResolvable | null, options?: SetParentOptions): Promise<this>;

  /**
   * Sets a new position for the guild channel.
   * @param position The new position for the guild channel
   * @param options Options for setting position
   * @example
   * // Set a new channel position
   * channel.setPosition(2)
   *   .then(newChannel => console.log(`Channel's new position is ${newChannel.position}`))
   *   .catch(console.error);
   */
  public setPosition(position: number, options?: SetChannelPositionOptions): Promise<this>;

  /**
   * Indicates whether this channel is {@link TextBasedChannels text-based}.
   */
  public isText(): this is TextChannel | NewsChannel;
}

/**
 * Represents a custom emoji.
 */
export class GuildEmoji extends BaseGuildEmoji {
  /**
   * @param client The instantiating client
   * @param data The data for the guild emoji
   * @param guild The guild the guild emoji is part of
   */
  public constructor(client: Client, data: RawGuildEmojiData, guild: Guild);

  /**
   * Array of role ids this emoji is active for
   */
  private _roles: Snowflake[];

  /**
   * Whether the emoji is deletable by the client user
   */
  public readonly deletable: boolean;

  /**
   * The guild this emoji is a part of
   */
  public guild: Guild;

  /**
   * The user who created this emoji
   */
  public author: User | null;

  /**
   * A manager for roles this emoji is active for.
   */
  public readonly roles: GuildEmojiRoleManager;

  /**
   * The URL to the emoji file
   */
  public readonly url: string;

  /**
   * Deletes the emoji.
   * @param reason Reason for deleting the emoji
   */
  public delete(reason?: string): Promise<GuildEmoji>;

  /**
   * Edits the emoji.
   * @param data The new data for the emoji
   * @param reason Reason for editing this emoji
   * @example
   * // Edit an emoji
   * emoji.edit({ name: 'newemoji' })
   *   .then(e => console.log(`Edited emoji ${e}`))
   *   .catch(console.error);
   */
  public edit(data: GuildEmojiEditData, reason?: string): Promise<GuildEmoji>;

  /**
   * Whether this emoji is the same as another one.
   * @param other The emoji to compare it to
   */
  public equals(other: GuildEmoji | unknown): boolean;

  /**
   * Fetches the author for this emoji
   */
  public fetchAuthor(): Promise<User>;

  /**
   * Sets the name of the emoji.
   * @param name The new name for the emoji
   * @param reason Reason for changing the emoji's name
   */
  public setName(name: string, reason?: string): Promise<GuildEmoji>;
}

/**
 * Represents a member of a guild on Discord.
 */
export class GuildMember extends PartialTextBasedChannel(Base) {
  /**
   * @param client The instantiating client
   * @param data The data for the guild member
   * @param guild The guild the member is part of
   */
  public constructor(client: Client, data: RawGuildMemberData, guild: Guild);

  /**
   * The guild member's avatar hash
   */
  public avatar: string | null;

  /**
   * Whether this member is bannable by the client user
   */
  public readonly bannable: boolean;

  /**
   * Whether the member has been removed from the guild
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The displayed color of this member in base 10
   */
  public readonly displayColor: number;

  /**
   * The displayed color of this member in hexadecimal
   */
  public readonly displayHexColor: HexColorString;

  /**
   * The nickname of this member, or their username if they don't have one
   */
  public readonly displayName: string;

  /**
   * The guild that this member is part of
   */
  public guild: Guild;

  /**
   * The member's id
   */
  public readonly id: Snowflake;

  /**
   * Whether this member has yet to pass the guild's membership gate
   */
  public pending: boolean;

  /**
   * The time this member's timeout will be removed
   */
  public readonly communicationDisabledUntil: Date | null;

  /**
   * The timestamp this member's timeout will be removed
   */
  public communicationDisabledUntilTimestamp: number | null;

  /**
   * The time this member joined the guild
   */
  public readonly joinedAt: Date | null;

  /**
   * The timestamp the member joined the guild at
   */
  public joinedTimestamp: number | null;

  /**
   * Whether this member is kickable by the client user
   */
  public readonly kickable: boolean;

  /**
   * Whether the client user is above this user in the hierarchy, according to role position and guild ownership.
   * This is a prerequisite for many moderative actions.
   */
  public readonly manageable: boolean;

  /**
   * Whether this member is moderatable by the client user
   */
  public readonly moderatable: boolean;

  /**
   * The nickname of this member, if they have one
   */
  public nickname: string | null;

  /**
   * Whether this GuildMember is a partial
   */
  public readonly partial: false;

  /**
   * The overall set of permissions for this member, taking only roles and owner status into account
   */
  public readonly permissions: Readonly<Permissions>;

  /**
   * The last time this member started boosting the guild
   */

  public readonly premiumSince: Date | null;

  /**
   * The last timestamp this member started boosting the guild
   */
  public premiumSinceTimestamp: number | null;

  /**
   * The presence of this guild member
   */
  public readonly presence: Presence | null;

  /**
   * A manager for the roles belonging to this member
   */
  public readonly roles: GuildMemberRoleManager;

  /**
   * The user that this guild member instance represents
   */
  public user: User;

  /**
   * The voice state of this member
   */
  public readonly voice: VoiceState;

  /**
   * A link to the member's guild avatar.
   * @param options Options for the Image URL
   */
  public avatarURL(options?: ImageURLOptions): string | null;

  /**
   * Bans this guild member.
   * @param options Options for the ban
   * @example
   * // ban a guild member
   * guildMember.ban({ days: 7, reason: 'They deserved it' })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public ban(options?: BanOptions): Promise<GuildMember>;

  /**
   * Times this guild member out.
   * @param communicationDisabledUntil The date or timestamp
   * for the member's communication to be disabled until. Provide `null` to remove the timeout.
   * @param reason The reason for this timeout.
   * @example
   * // Time a guild member out for 5 minutes
   * guildMember.disableCommunicationUntil(Date.now() + (5 * 60 * 1000), 'They deserved it')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public disableCommunicationUntil(timeout: DateResolvable | null, reason?: string): Promise<GuildMember>;

  /**
   * Times this guild member out.
   * @param timeout The time in milliseconds
   * for the member's communication to be disabled until. Provide `null` to remove the timeout.
   * @param reason The reason for this timeout.
   * @example
   * // Time a guild member out for 5 minutes
   * guildMember.timeout(5 * 60 * 1000, 'They deserved it')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public timeout(timeout: number | null, reason?: string): Promise<GuildMember>;

  /**
   * Fetches this GuildMember.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<GuildMember>;

  /**
   * Creates a DM channel between the client and this member.
   */
  public createDM(force?: boolean): Promise<DMChannel>;

  /**
   * Deletes any DMs with this member.
   */
  public deleteDM(): Promise<DMChannel>;

  /**
   * A link to the member's guild avatar if they have one.
   * Otherwise, a link to their {@link User.displayAvatarURL} will be returned.
   * @param options Options for the Image URL
   */
  public displayAvatarURL(options?: ImageURLOptions): string;

  /**
   * Edits this member.
   * @param data The data to edit the member with
   * @param reason Reason for editing this user
   */
  public edit(data: GuildMemberEditData, reason?: string): Promise<GuildMember>;

  /**
   * Whether this member is currently timed out
   */
  public isCommunicationDisabled(): this is GuildMember & {
    communicationDisabledUntilTimestamp: number;
    readonly communicationDisabledUntil: Date;
  };

  /**
   * Kicks this member from the guild.
   * @param reason Reason for kicking user
   */
  public kick(reason?: string): Promise<GuildMember>;

  /**
   * Returns `channel.permissionsFor(guildMember)`. Returns permissions for a member in a guild channel,
   * taking into account roles and permission overwrites.
   * @param channel The guild channel to use as context
   */
  public permissionsIn(channel: GuildChannelResolvable): Readonly<Permissions>;

  /**
   * Sets the nickname for this member.
   * @param nick The nickname for the guild member, or `null` if you want to reset their nickname
   * @param reason Reason for setting the nickname
   */
  public setNickname(nickname: string | null, reason?: string): Promise<GuildMember>;

  /**
   * Transforms the guild member to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the user's mention instead of the GuildMember object.
   * @example
   * // Logs: Hello from <@123456789012345678>!
   * console.log(`Hello from ${member}!`);
   */
  public toString(): MemberMention;

  /**
   * Returns the id of this object. Returns the primitive value of the specified object.
   */
  public valueOf(): string;
}

/**
 * Represents the data about the guild any bot can preview, connected to the specified guild.
 */
export class GuildPreview extends Base {
  public constructor(client: Client, data: RawGuildPreviewData);

  /**
   * The approximate count of members in this guild
   */
  public approximateMemberCount: number;

  /**
   * The approximate count of online members in this guild
   */
  public approximatePresenceCount: number;

  /**
   * The time this guild was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp this guild was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The description for this guild
   */
  public description: string | null;

  /**
   * The discovery splash icon of this guild
   */
  public discoverySplash: string | null;

  /**
   * Collection of emojis belonging to this guild
   */
  public emojis: Collection<Snowflake, GuildPreviewEmoji>;

  /**
   * An array of enabled guild features
   */
  public features: GuildFeatures[];

  /**
   * The icon of this guild
   */
  public icon: string | null;

  /**
   * The id of this guild
   */
  public id: Snowflake;

  /**
   * The name of this guild
   */
  public name: string;

  /**
   * The splash icon of this guild
   */
  public splash: string | null;

  /**
   * The URL to this guild's discovery splash.
   * @param options Options for the Image URL
   */
  public discoverySplashURL(options?: StaticImageURLOptions): string | null;

  /**
   * The URL to this guild's icon.
   * @param options Options for the Image URL
   */
  public iconURL(options?: ImageURLOptions): string | null;

  /**
   * The URL to this guild's splash.
   * @param options Options for the Image URL
   */
  public splashURL(options?: StaticImageURLOptions): string | null;

  /**
   * Fetches this guild.
   */
  public fetch(): Promise<GuildPreview>;

  /**
   * Transforms the guild preview to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the guild's name instead of the Guild object.
   * @example
   * // Logs: Hello from My Guild!
   * console.log(`Hello from ${previewGuild}!`);
   */
  public toString(): string;
}

/**
 * Represents a scheduled event in a {@link Guild}.
 */
export class GuildScheduledEvent<S extends GuildScheduledEventStatus = GuildScheduledEventStatus> extends Base {
  private constructor(client: Client, data: RawGuildScheduledEventData);

  /**
   * The id of the guild scheduled event
   */
  public id: Snowflake;

  /**
   * The id of the guild this guild scheduled event belongs to
   */
  public guildId: Snowflake;

  /**
   * The channel id in which the scheduled event will be hosted, or `null` if entity type is `EXTERNAL`
   */
  public channelId: Snowflake | null;

  /**
   * The id of the user that created this guild scheduled event
   */
  public creatorId: Snowflake | null;

  /**
   * The name of the guild scheduled event
   */
  public name: string;

  /**
   * The description of the guild scheduled event
   */
  public description: string | null;

  /**
   * The timestamp the guild scheduled event will start at
   * <info>This can be potentially `null` only when it's an {@link AuditLogEntryTarget}</info>
   */
  public scheduledStartTimestamp: number | null;

  /**
   * The timestamp the guild scheduled event will end at,
   * or `null` if the event does not have a scheduled time to end
   */
  public scheduledEndTimestamp: number | null;

  /**
   * The privacy level of the guild scheduled event
   */
  public privacyLevel: GuildScheduledEventPrivacyLevel;

  /**
   * The status of the guild scheduled event
   */
  public status: S;

  /**
   * The type of hosting entity associated with the scheduled event
   */
  public entityType: GuildScheduledEventEntityType;

  /**
   * The id of the hosting entity associated with the scheduled event
   */
  public entityId: Snowflake | null;

  /**
   * Additional metadata
   */
  public entityMetadata: GuildScheduledEventEntityMetadata;

  /**
   * The number of users who are subscribed to this guild scheduled event
   */
  public userCount: number | null;

  /**
   * The user that created this guild scheduled event
   */
  public creator: User | null;

  /**
   * The timestamp the guild scheduled event was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The time the guild scheduled event was created at
   */
  public readonly createdAt: Date;

  /**
   * The time the guild scheduled event will start at
   */
  public readonly scheduledStartAt: Date;

  /**
   * The time the guild scheduled event will end at,
   * or `null` if the event does not have a scheduled time to end
   */
  public readonly scheduledEndAt: Date | null;

  /**
   * The channel associated with this scheduled event
   */
  public readonly channel: VoiceChannel | StageChannel | null;

  /**
   * The guild this scheduled event belongs to
   */
  public readonly guild: Guild | null;

  /**
   * The URL to the guild scheduled event
   */
  public readonly url: string;

  /**
   * Creates an invite URL to this guild scheduled event.
   * @param options The options to create the invite
   */
  public createInviteURL(options?: CreateGuildScheduledEventInviteURLOptions): Promise<string>;

  /**
   * Edits this guild scheduled event.
   * @param options The options to edit the guild scheduled event
   * @example
   * // Edit a guild scheduled event
   * guildScheduledEvent.edit({ name: 'Party' })
   *  .then(guildScheduledEvent => console.log(guildScheduledEvent))
   *  .catch(console.error);
   */
  public edit<T extends GuildScheduledEventSetStatusArg<S>>(
    options: GuildScheduledEventEditOptions<S, T>,
  ): Promise<GuildScheduledEvent<T>>;

  /**
   * Deletes this guild scheduled event.
   * @example
   * // Delete a guild scheduled event
   * guildScheduledEvent.delete()
   *  .then(guildScheduledEvent => console.log(guildScheduledEvent))
   *  .catch(console.error);
   */
  public delete(): Promise<GuildScheduledEvent<S>>;

  /**
   * Sets a new name for the guild scheduled event.
   * @param name The new name of the guild scheduled event
   * @param reason The reason for changing the name
   * @example
   * // Set name of a guild scheduled event
   * guildScheduledEvent.setName('Birthday Party')
   *  .then(guildScheduledEvent => console.log(`Set the name to: ${guildScheduledEvent.name}`))
   *  .catch(console.error);
   */
  public setName(name: string, reason?: string): Promise<GuildScheduledEvent<S>>;

  /**
   * Sets a new time to schedule the event at.
   * @param scheduledStartTime The time to schedule the event at
   * @param reason The reason for changing the scheduled start time
   * @example
   * // Set start time of a guild scheduled event
   * guildScheduledEvent.setScheduledStartTime('2022-09-24T00:00:00+05:30')
   *  .then(guildScheduledEvent => console.log(`Set the start time to: ${guildScheduledEvent.scheduledStartTime}`))
   *  .catch(console.error);
   */
  public setScheduledStartTime(scheduledStartTime: DateResolvable, reason?: string): Promise<GuildScheduledEvent<S>>;

  /**
   * Sets a new time to end the event at.
   * @param scheduledEndTime The time to end the event at
   * @param reason The reason for changing the scheduled end time
   * @example
   * // Set end time of a guild scheduled event
   * guildScheduledEvent.setScheduledEndTime('2022-09-25T00:00:00+05:30')
   *  .then(guildScheduledEvent => console.log(`Set the end time to: ${guildScheduledEvent.scheduledEndTime}`))
   *  .catch(console.error);
   */
  public setScheduledEndTime(scheduledEndTime: DateResolvable, reason?: string): Promise<GuildScheduledEvent<S>>;

  /**
   * Sets the new description of the guild scheduled event.
   * @param description The description of the guild scheduled event
   * @param reason The reason for changing the description
   * @example
   * // Set description of a guild scheduled event
   * guildScheduledEvent.setDescription('A virtual birthday party')
   *  .then(guildScheduledEvent => console.log(`Set the description to: ${guildScheduledEvent.description}`))
   *  .catch(console.error);
   */
  public setDescription(description: string, reason?: string): Promise<GuildScheduledEvent<S>>;

  /**
   * Sets the new status of the guild scheduled event.
   * <info>If you're working with TypeScript, use this method in conjunction with status type-guards
   * like {@link GuildScheduledEvent#isScheduled} to get only valid status as suggestion</info>
   * @param status The status of the guild scheduled event
   * @param reason The reason for changing the status
   * @example
   * // Set status of a guild scheduled event
   * guildScheduledEvent.setStatus('ACTIVE')
   *  .then(guildScheduledEvent => console.log(`Set the status to: ${guildScheduledEvent.status}`))
   *  .catch(console.error);
   */
  public setStatus<T extends GuildScheduledEventSetStatusArg<S>>(
    status: T,
    reason?: string,
  ): Promise<GuildScheduledEvent<T>>;

  /**
   * Sets the new location of the guild scheduled event.
   * @param location The location of the guild scheduled event
   * @param reason The reason for changing the location
   * @example
   * // Set location of a guild scheduled event
   * guildScheduledEvent.setLocation('Earth')
   *  .then(guildScheduledEvent => console.log(`Set the location to: ${guildScheduledEvent.entityMetadata.location}`))
   *  .catch(console.error);
   */
  public setLocation(location: string, reason?: string): Promise<GuildScheduledEvent<S>>;

  /**
   * Fetches subscribers of this guild scheduled event.
   * @param options Options for fetching the subscribers
   */
  public fetchSubscribers<T extends FetchGuildScheduledEventSubscribersOptions>(
    options?: T,
  ): Promise<GuildScheduledEventManagerFetchSubscribersResult<T>>;

  /**
   * When concatenated with a string, this automatically concatenates the event's URL instead of the object.
   * @example
   * // Logs: Event: https://discord.com/events/412345678901234567/499876543211234567
   * console.log(`Event: ${guildScheduledEvent}`);
   */
  public toString(): string;

  /**
   * Indicates whether this guild scheduled event has an `ACTIVE` status.
   */
  public isActive(): this is GuildScheduledEvent<'ACTIVE'>;

  /**
   * Indicates whether this guild scheduled event has a `CANCELED` status.
   */
  public isCanceled(): this is GuildScheduledEvent<'CANCELED'>;

  /**
   * Indicates whether this guild scheduled event has a `COMPLETED` status.
   */
  public isCompleted(): this is GuildScheduledEvent<'COMPLETED'>;

  /**
   * Indicates whether this guild scheduled event has a `SCHEDULED` status.
   */
  public isScheduled(): this is GuildScheduledEvent<'SCHEDULED'>;
}

/**
 * Represents the template for a guild.
 */
export class GuildTemplate extends Base {
  /**
   * @param client The instantiating client
   * @param data The raw data for the template
   */
  public constructor(client: Client, data: RawGuildTemplateData);

  /**
   * The timestamp of when this template was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The timestamp of when this template was last synced to the guild
   */
  public readonly updatedTimestamp: number;

  /**
   * The URL of this template
   */
  public readonly url: string;

  /**
   * The unique code of this template
   */
  public code: string;

  /**
   * The name of this template
   */
  public name: string;

  /**
   * The description of this template
   */
  public description: string | null;

  /**
   * The amount of times this template has been used
   */
  public usageCount: number;

  /**
   * The user that created this template
   */
  public creator: User;

  /**
   * The id of the user that created this template
   */
  public creatorId: Snowflake;

  /**
   * The time when this template was created at
   */
  public createdAt: Date;

  /**
   * The time when this template was last synced to the guild
   */
  public updatedAt: Date;

  /**
   * The guild that this template belongs to
   */
  public guild: Guild | null;

  /**
   * The id of the guild that this template belongs to
   */
  public guildId: Snowflake;

  /**
   * The data of the guild that this template would create
   */
  public serializedGuild: APITemplateSerializedSourceGuild;

  /**
   * Whether this template has unsynced changes
   */
  public unSynced: boolean | null;

  /**
   * Creates a guild based on this template.
   * <warn>This is only available to bots in fewer than 10 guilds.</warn>
   * @param name The name of the guild
   * @param icon The icon for the guild
   */
  public createGuild(name: string, icon?: BufferResolvable | Base64Resolvable): Promise<Guild>;

  /**
   * Deletes this template.
   */
  public delete(): Promise<GuildTemplate>;

  /**
   * Updates the metadata of this template.
   * @param options Options for editing the template
   */
  public edit(options?: EditGuildTemplateOptions): Promise<GuildTemplate>;

  /**
   * Syncs this template to the current state of the guild.
   */
  public sync(): Promise<GuildTemplate>;

  /**
   * Regular expression that globally matches guild template links
   */
  public static GUILD_TEMPLATES_PATTERN: RegExp;
}

/**
 * Represents an instance of an emoji belonging to a public guild obtained through Discord's preview endpoint.
 */
export class GuildPreviewEmoji extends BaseGuildEmoji {
  public constructor(client: Client, data: RawGuildEmojiData, guild: GuildPreview);

  /**
   * The public guild this emoji is part of
   */
  public guild: GuildPreview;

  /**
   * The roles this emoji is active for
   */
  public roles: Snowflake[];
}

/**
 * Represents an HTTP error from a request.
 */
export class HTTPError extends Error {
  public constructor(message: string, name: string, code: number, request: unknown);

  /**
   * HTTP error code returned from the request
   */
  public code: number;

  /**
   * The HTTP method used for the request
   */
  public method: string;

  /**
   * The name of the error
   */
  public name: string;

  /**
   * The path of the request relative to the HTTP endpoint
   */
  public path: string;

  /**
   * The data associated with the request that caused this error
   */
  public requestData: HTTPErrorData;
}

/**
 * Represents a RateLimit error from a request.
 */
// tslint:disable-next-line:no-empty-interface - Merge RateLimitData into RateLimitError to not have to type it again
export interface RateLimitError extends RateLimitData {}
export class RateLimitError extends Error {
  public constructor(data: RateLimitData);

  /**
   * The name of the error
   */
  public name: 'RateLimitError';
}

/**
 * Represents a guild integration.
 */
export class Integration extends Base {
  public constructor(client: Client, data: RawIntegrationData, guild: Guild);

  /**
   * The account integration information
   */
  public account: IntegrationAccount;

  /**
   * The application for this integration
   */
  public application: IntegrationApplication | null;

  /**
   * Whether this integration is enabled
   */
  public enabled: boolean;

  /**
   * The behavior of expiring subscribers
   */
  public expireBehavior: number | undefined;

  /**
   * The grace period before expiring subscribers
   */
  public expireGracePeriod: number | undefined;

  /**
   * The guild this integration belongs to
   */
  public guild: Guild;

  /**
   * The integration id
   */
  public id: Snowflake | string;

  /**
   * The integration name
   */
  public name: string;

  /**
   * The role that this integration uses for subscribers
   */
  public role: Role | undefined;

  /**
   * Whether emoticons should be synced for this integration (twitch only currently)
   */
  public enableEmoticons: boolean | null;

  /**
   * All roles that are managed by this integration
   */
  public readonly roles: Collection<Snowflake, Role>;

  /**
   * The last time this integration was last synced
   */
  public syncedAt: number | undefined;

  /**
   * Whether this integration is syncing
   */
  public syncing: boolean | undefined;

  /**
   * The integration type
   */
  public type: IntegrationType;

  /**
   * The user for this integration
   */
  public user: User | null;

  /**
   * How many subscribers this integration has
   */
  public subscriberCount: number | null;

  /**
   * Whether this integration has been revoked
   */
  public revoked: boolean | null;

  /**
   * Deletes this integration.
   * @param reason Reason for deleting this integration
   */
  public delete(reason?: string): Promise<Integration>;
}

/**
 * Represents an Integration's OAuth2 Application.
 */
export class IntegrationApplication extends Application {
  public constructor(client: Client, data: RawIntegrationApplicationData);

  /**
   * The bot user for this application
   */
  public bot: User | null;

  /**
   * The URL of the application's terms of service
   */
  public termsOfServiceURL: string | null;

  /**
   * The URL of the application's privacy policy
   */
  public privacyPolicyURL: string | null;

  /**
   * The Array of RPC origin URLs
   */
  public rpcOrigins: string[];

  /**
   * The application's summary
   */
  public summary: string | null;

  /**
   * Whether the application can be default hooked by the client
   */
  public hook: boolean | null;

  /**
   * The hash of the application's cover image
   */
  public cover: string | null;

  /**
   * The hex-encoded key for verification in interactions and the GameSDK's GetTicket
   */
  public verifyKey: string | null;
}

/**
 * Data structure that makes it easy to calculate intents.
 */
export class Intents extends BitField<IntentsString> {
  /**
   * Numeric WebSocket intents.
   * @see {@link [List of Intents](https://discord.com/developers/docs/topics/gateway#list-of-intents)}
   */
  public static FLAGS: Record<IntentsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<IntentsString, number>): number;
}

export type CacheType = 'cached' | 'raw' | 'present';

export type CacheTypeReducer<
  State extends CacheType,
  CachedType,
  RawType = CachedType,
  PresentType = CachedType | RawType,
  Fallback = PresentType | null,
> = [State] extends ['cached']
  ? CachedType
  : [State] extends ['raw']
  ? RawType
  : [State] extends ['present']
  ? PresentType
  : Fallback;

/**
 * Represents an interaction.
 */
export class Interaction<Cached extends CacheType = CacheType> extends Base {
  // This a technique used to brand different cached types. Or else we'll get `never` errors on typeguard checks.
  private readonly _cacheType: Cached;
  public constructor(client: Client, data: RawInteractionData);

  /**
   * The application's id
   */
  public applicationId: Snowflake;

  /**
   * The channel this interaction was sent in
   */
  public readonly channel: CacheTypeReducer<
    Cached,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    GuildTextBasedChannel | null,
    TextBasedChannel | null
  >;

  /**
   * The id of the channel this interaction was sent in
   */
  public channelId: Snowflake | null;

  /**
   * The time the interaction was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the interaction was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The guild this interaction was sent in
   */
  public readonly guild: CacheTypeReducer<Cached, Guild, null>;

  /**
   * The id of the guild this interaction was sent in
   */
  public guildId: CacheTypeReducer<Cached, Snowflake>;

  /**
   * The interaction's id
   */
  public id: Snowflake;

  /**
   * If this interaction was sent in a guild, the member which sent it
   */
  public member: CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember>;

  /**
   * The interaction's token
   */
  public readonly token: string;

  /**
   * The interaction's type
   */
  public type: InteractionType;

  /**
   * The user which sent this interaction
   */
  public user: User;

  /**
   * The version
   */
  public version: number;

  /**
   * The permissions of the member, if one exists, in the channel this interaction was executed in
   */
  public memberPermissions: CacheTypeReducer<Cached, Readonly<Permissions>>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is Interaction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is Interaction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is Interaction<'raw'>;

  /**
   * Indicates whether this interaction is a {@link BaseCommandInteraction}.
   */
  public isApplicationCommand(): this is BaseCommandInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link ButtonInteraction}.
   */
  public isButton(): this is ButtonInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link CommandInteraction}.
   */
  public isCommand(): this is CommandInteraction<Cached>;

  /**
   * Indicates whether this interaction is an {@link AutocompleteInteraction}
   */
  public isAutocomplete(): this is AutocompleteInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link ContextMenuInteraction}
   */
  public isContextMenu(): this is ContextMenuInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link UserContextMenuInteraction}
   */
  public isUserContextMenu(): this is UserContextMenuInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link MessageContextMenuInteraction}
   */
  public isMessageContextMenu(): this is MessageContextMenuInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link MessageComponentInteraction}.
   */
  public isMessageComponent(): this is MessageComponentInteraction<Cached>;

  /**
   * Indicates whether this interaction is a {@link SelectMenuInteraction}.
   */
  public isSelectMenu(): this is SelectMenuInteraction<Cached>;
}

/**
 * Collects interactions.
 * Will automatically stop if the message ({@link ClientEvents.messageDelete messageDelete} or
 * {@link ClientEvents.messageDeleteBulk messageDeleteBulk}),
 * channel ({@link ClientEvents.channelDelete channelDelete}), or
 * guild ({@link ClientEvents.guildDelete guildDelete}) is deleted.
 * <info>Interaction collectors that do not specify `time` or `idle` may be prone to always running.
 * Ensure your interaction collectors end via either of these options or manual cancellation.</info>
 */
export class InteractionCollector<T extends Interaction> extends Collector<Snowflake, T> {
  /**
   * @param client The client on which to collect interactions
   * @param options The options to apply to this collector
   */
  public constructor(client: Client, options?: InteractionCollectorOptions<T>);

  /**
   * Handles checking if the message has been deleted, and if so, stops the collector with the reason 'messageDelete'.
   * @param message The message that was deleted
   */
  private _handleMessageDeletion(message: Message): void;

  /**
   * Handles checking if the channel has been deleted, and if so, stops the collector with the reason 'channelDelete'.
   * @param channel The channel that was deleted
   */
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;

  /**
   * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
   * @param guild The guild that was deleted
   */
  private _handleGuildDeletion(guild: Guild): void;

  /**
   * The channel from which to collect interactions, if provided
   */
  public channelId: Snowflake | null;

  /**
   * The type of component to collect
   */
  public componentType: MessageComponentType | null;

  /**
   * The reason this collector has ended with, or null if it hasn't ended yet
   */
  public readonly endReason: string | null;

  /**
   * The guild from which to collect interactions, if provided
   */
  public guildId: Snowflake | null;

  /**
   * The type of interaction to collect
   */
  public interactionType: InteractionType | null;

  /**
   * The message from which to collect interactions, if provided
   */
  public messageId: Snowflake | null;

  /**
   * The options of this collector
   */
  public options: InteractionCollectorOptions<T>;

  /**
   * The total number of interactions collected
   */
  public total: number;

  /**
   * The users that have interacted with this collector
   */
  public users: Collection<Snowflake, User>;

  /**
   * Handles an incoming interaction for possible collection.
   * @param interaction The interaction to possibly collect
   */
  public collect(interaction: Interaction): Snowflake;

  /**
   * Empties this interaction collector.
   */
  public empty(): void;

  /**
   * Handles an interaction for possible disposal.
   * @param interaction The interaction that could be disposed of
   */
  public dispose(interaction: Interaction): Snowflake;

  /**
   * Emitted whenever an interaction is collected/disposed.
   * @param interaction The interaction that was collected/disposed
   */
  public on(event: 'collect' | 'dispose', listener: (interaction: T) => Awaitable<void>): this;

  /**
   * Emitted when the collector is finished collecting.
   * @param collected The elements collected by the collector
   * @param reason The reason the collector ended
   */
  public on(event: 'end', listener: (collected: Collection<Snowflake, T>, reason: string) => Awaitable<void>): this;

  public on(event: string, listener: (...args: any[]) => Awaitable<void>): this;

  /**
   * Emitted whenever an interaction is collected/disposed.
   * @param interaction The interaction that was collected/disposed
   */
  public once(event: 'collect' | 'dispose', listener: (interaction: T) => Awaitable<void>): this;

  /**
   * Emitted when the collector is finished collecting.
   * @param collected The elements collected by the collector
   * @param reason The reason the collector ended
   */
  public once(event: 'end', listener: (collected: Collection<Snowflake, T>, reason: string) => Awaitable<void>): this;

  public once(event: string, listener: (...args: any[]) => Awaitable<void>): this;
}

/**
 * Represents a webhook for an Interaction
 */
export class InteractionWebhook extends PartialWebhookMixin() {
  /**
   * @param client The instantiating client
   * @param id The application's id
   * @param token The interaction's token
   */
  public constructor(client: Client, id: Snowflake, token: string);

  /**
   * The interaction's token
   */
  public token: string;

  /**
   * Sends a message with this webhook.
   * @param options The content for the reply
   */
  public send(options: string | MessagePayload | InteractionReplyOptions): Promise<Message | APIMessage>;
}

/**
 * Represents an invitation to a guild channel.
 */
export class Invite extends Base {
  public constructor(client: Client, data: RawInviteData);

  /**
   * The channel this invite is for
   */
  public channel: NonThreadGuildBasedChannel | PartialGroupDMChannel;

  /**
   * The channel's id this invite is for
   */
  public channelId: Snowflake;

  /**
   * The code for this invite
   */
  public code: string;

  /**
   * Whether the invite is deletable by the client user
   */
  public readonly deletable: boolean;

  /**
   * The time the invite was created at
   */
  public readonly createdAt: Date | null;

  /**
   * The timestamp this invite was created at
   */
  public createdTimestamp: number | null;

  /**
   * The time the invite will expire at
   */
  public readonly expiresAt: Date | null;

  /**
   * The timestamp the invite will expire at
   */
  public readonly expiresTimestamp: number | null;

  /**
   * The guild the invite is for including welcome screen data if present
   */
  public guild: InviteGuild | Guild | null;

  /**
   * The user who created this invite
   */
  public inviter: User | null;

  /**
   * The user's id who created this invite
   */
  public inviterId: Snowflake | null;

  /**
   * The maximum age of the invite, in seconds, 0 if never expires
   * <info>This is only available when the invite was fetched through {@link GuildInviteManager.fetch}
   * or created through {@link GuildInviteManager.create}.</info>
   */
  public maxAge: number | null;

  /**
   * The maximum uses of this invite
   * <info>This is only available when the invite was fetched through {@link GuildInviteManager.fetch}
   * or created through {@link GuildInviteManager.create}.</info>
   */
  public maxUses: number | null;

  /**
   * The approximate total number of members of the guild this invite is for
   * <info>This is only available when the invite was fetched through {@link Client.fetchInvite}.</info>
   */
  public memberCount: number;

  /**
   * The approximate number of online members of the guild this invite is for
   * <info>This is only available when the invite was fetched through {@link Client.fetchInvite}.</info>
   */
  public presenceCount: number;

  /**
   * The embedded application to open for this voice channel embedded application invite
   */
  public targetApplication: IntegrationApplication | null;

  /**
   * The user whose stream to display for this voice channel stream invite
   */
  public targetUser: User | null;

  /**
   * The target type
   */
  public targetType: InviteTargetType | null;

  /**
   * Whether or not this invite only grants temporary membership
   * <info>This is only available when the invite was fetched through {@link GuildInviteManager.fetch}
   * or created through {@link GuildInviteManager.create}.</info>
   */
  public temporary: boolean | null;

  /**
   * The URL to the invite
   */
  public readonly url: string;

  /**
   * How many times this invite has been used
   * <info>This is only available when the invite was fetched through {@link GuildInviteManager.fetch}
   * or created through {@link GuildInviteManager.create}.</info>
   */
  public uses: number | null;

  /**
   * Deletes this invite.
   * @param reason Reason for deleting this invite
   */
  public delete(reason?: string): Promise<Invite>;

  /**
   * Transforms the invite to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically concatenates the invite's URL instead of the object.
   * @example
   * // Logs: Invite: https://discord.gg/A1b2C3
   * console.log(`Invite: ${invite}`);
   */
  public toString(): string;

  /**
   * Regular expression that globally matches Discord invite links
   */
  public static INVITES_PATTERN: RegExp;

  /**
   * The stage instance data if there is a public {@link StageInstance} in the stage channel this invite is for
   */
  public stageInstance: InviteStageInstance | null;

  /**
   * The guild scheduled event data if there is a {@link GuildScheduledEvent} in the channel this invite is for
   */
  public guildScheduledEvent: GuildScheduledEvent | null;
}

/**
 * Represents the data about a public {@link StageInstance} in an {@link Invite}.
 */
export class InviteStageInstance extends Base {
  public constructor(client: Client, data: RawInviteStageInstance, channelId: Snowflake, guildId: Snowflake);

  /**
   * The id of the stage channel this invite is for
   */
  public channelId: Snowflake;

  /**
   * The stage channel's guild id
   */
  public guildId: Snowflake;

  /**
   * The members speaking in the stage channel
   */
  public members: Collection<Snowflake, GuildMember>;

  /**
   * The topic of the stage instance
   */
  public topic: string;

  /**
   * The number of users in the stage channel
   */
  public participantCount: number;

  /**
   * The number of users speaking in the stage channel
   */
  public speakerCount: number;

  /**
   * The stage channel this invite is for
   */
  public readonly channel: StageChannel | null;

  /**
   * The guild of the stage channel this invite is for
   */
  public readonly guild: Guild | null;
}

/**
 * Represents a guild received from an invite, includes welcome screen data if available.
 */
export class InviteGuild extends AnonymousGuild {
  public constructor(client: Client, data: RawInviteGuildData);

  /**
   * The welcome screen for this invite guild
   */
  public welcomeScreen: WelcomeScreen | null;
}

/**
 * A Collection which holds a max amount of entries and sweeps periodically.
 */
export class LimitedCollection<K, V> extends Collection<K, V> {
  /**
   * @param options Options for constructing the Collection.
   * @param iterable Optional entries passed to the Map constructor.
   */
  public constructor(options?: LimitedCollectionOptions<K, V>, iterable?: Iterable<readonly [K, V]>);

  /**
   * The max size of the Collection.
   */
  public maxSize: number;

  /**
   * A function called to check if an entry should be kept when the Collection is at max size.
   */
  public keepOverLimit: ((value: V, key: K, collection: this) => boolean) | null;

  /**
   * The id of the interval being used to sweep.
   * @deprecated Use Global Sweepers instead
   */
  public interval: NodeJS.Timeout | null;

  /**
   * A function called every sweep interval that returns a function passed to `sweep`.
   * @deprecated Use Global Sweepers instead
   */
  public sweepFilter: SweepFilter<K, V> | null;

  /**
   * Create a sweepFilter function that uses a lifetime to determine sweepability.
   * @param options The options used to generate the filter function
   * @deprecated Use `Sweepers.filterByLifetime` instead
   */
  public static filterByLifetime<K, V>(options?: LifetimeFilterOptions<K, V>): SweepFilter<K, V>;
}

export type MessageCollectorOptionsParams<T extends MessageComponentTypeResolvable, Cached extends boolean = boolean> =
  | {
      componentType?: T;
    } & MessageComponentCollectorOptions<MappedInteractionTypes<Cached>[T]>;

export type MessageChannelCollectorOptionsParams<
  T extends MessageComponentTypeResolvable,
  Cached extends boolean = boolean,
> =
  | {
      componentType?: T;
    } & MessageChannelComponentCollectorOptions<MappedInteractionTypes<Cached>[T]>;

export type AwaitMessageCollectorOptionsParams<
  T extends MessageComponentTypeResolvable,
  Cached extends boolean = boolean,
> =
  | { componentType?: T } & Pick<
      InteractionCollectorOptions<MappedInteractionTypes<Cached>[T]>,
      keyof AwaitMessageComponentOptions<any>
    >;

export interface StringMappedInteractionTypes<Cached extends CacheType = CacheType> {
  BUTTON: ButtonInteraction<Cached>;
  SELECT_MENU: SelectMenuInteraction<Cached>;
  ACTION_ROW: MessageComponentInteraction<Cached>;
}

export type WrapBooleanCache<T extends boolean> = If<T, 'cached', CacheType>;

export type MappedInteractionTypes<Cached extends boolean = boolean> = EnumValueMapped<
  typeof MessageComponentTypes,
  {
    BUTTON: ButtonInteraction<WrapBooleanCache<Cached>>;
    SELECT_MENU: SelectMenuInteraction<WrapBooleanCache<Cached>>;
    ACTION_ROW: MessageComponentInteraction<WrapBooleanCache<Cached>>;
  }
>;

/**
 * Represents a message on Discord.
 */
export class Message<Cached extends boolean = boolean> extends Base {
  private readonly _cacheType: Cached;

  /**
   * @param client The instantiating client
   * @param data The data for the message
   */
  public constructor(client: Client, data: RawMessageData);

  private _patch(data: RawPartialMessageData | RawMessageData): void;

  /**
   * Group activity
   */
  public activity: MessageActivity | null;

  /**
   * The id of the application of the interaction that sent this message, if any
   */
  public applicationId: Snowflake | null;

  /**
   * A collection of attachments in the message - e.g. Pictures - mapped by their ids
   */
  public attachments: Collection<Snowflake, MessageAttachment>;

  /**
   * The author of the message
   */
  public author: User;

  /**
   * The channel that the message was sent in
   */
  public readonly channel: If<Cached, GuildTextBasedChannel, TextBasedChannel>;

  /**
   * The id of the channel the message was sent in
   */
  public channelId: Snowflake;

  /**
   * The message contents with all mentions replaced by the equivalent text.
   * If mentions cannot be resolved to a name, the relevant mention in the message content will not be converted.
   */
  public readonly cleanContent: string;

  /**
   * A list of MessageActionRows in the message
   */
  public components: MessageActionRow[];

  /**
   * The content of the message
   */
  public content: string;

  /**
   * The time the message was sent at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the message was sent at
   */
  public createdTimestamp: number;

  /**
   * Whether the message is crosspostable by the client user
   */
  public readonly crosspostable: boolean;

  /**
   * Whether the message is deletable by the client user
   */
  public readonly deletable: boolean;

  /**
   * Whether or not the message has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * Whether the message is editable by the client user
   */
  public readonly editable: boolean;

  /**
   * The time the message was last edited at (if applicable)
   */
  public readonly editedAt: Date | null;

  /**
   * The timestamp the message was last edited at (if applicable)
   */
  public editedTimestamp: number | null;

  /**
   * A list of embeds in the message - e.g. YouTube Player
   */
  public embeds: MessageEmbed[];

  /**
   * Supplemental application information for group activities
   */
  public groupActivityApplication: ClientApplication | null;

  /**
   * The id of the guild the message was sent in, if any
   */
  public guildId: If<Cached, Snowflake>;

  /**
   * The guild the message was sent in (if in a guild channel)
   */
  public readonly guild: If<Cached, Guild>;

  /**
   * Whether this message has a thread associated with it
   */
  public readonly hasThread: boolean;

  /**
   * The message's id
   */
  public id: Snowflake;

  /**
   * Partial data of the interaction that this message is a reply to
   */
  public interaction: MessageInteraction | null;

  /**
   * Represents the author of the message as a guild member.
   * Only available if the message comes from a guild where the author is still a member
   */
  public readonly member: GuildMember | null;

  /**
   * All valid mentions that the message contains
   */
  public mentions: MessageMentions;

  /**
   * A random number or string used for checking message delivery
   * <warn>This is only received after the message was sent successfully, and
   * lost if re-fetched</warn>
   */
  public nonce: string | number | null;

  /**
   * Whether or not this message is a partial
   */
  public readonly partial: false;

  /**
   * Whether the message is pinnable by the client user
   */
  public readonly pinnable: boolean;

  /**
   * Whether or not this message is pinned
   */
  public pinned: boolean;

  /**
   * A manager of the reactions belonging to this message
   */
  public reactions: ReactionManager;

  /**
   * A collection of stickers in the message
   */
  public stickers: Collection<Snowflake, Sticker>;

  /**
   * Whether or not this message was sent by Discord, not actually a user (e.g. pin notifications)
   */
  public system: boolean;

  /**
   * The thread started by this message
   * <info>This property is not suitable for checking whether a message has a thread,
   * use {@link Message.hasThread} instead.</info>
   */
  public readonly thread: ThreadChannel | null;

  /**
   * Whether or not the message was Text-To-Speech
   */
  public tts: boolean;

  /**
   * The type of the message
   */
  public type: MessageType;

  /**
   * The URL to jump to this message
   */
  public readonly url: string;

  /**
   * The id of the webhook that sent the message, if applicable
   */
  public webhookId: Snowflake | null;

  /**
   * Flags that are applied to the message
   */
  public flags: Readonly<MessageFlags>;

  /**
   * Message reference data
   */
  public reference: MessageReference | null;

  /**
   * Collects a single component interaction that passes the filter.
   * The Promise will reject if the time expires.
   * @param options Options to pass to the internal collector
   * @example
   * // Collect a message component interaction
   * const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';
   * message.awaitMessageComponent({ filter, time: 15_000 })
   *   .then(interaction => console.log(`${interaction.customId} was clicked!`))
   *   .catch(console.error);
   */
  public awaitMessageComponent<T extends MessageComponentTypeResolvable = 'ACTION_ROW'>(
    options?: AwaitMessageCollectorOptionsParams<T, Cached>,
  ): Promise<MappedInteractionTypes<Cached>[T]>;

  /**
   * Similar to createReactionCollector but in promise form.
   * Resolves with a collection of reactions that pass the specified filter.
   * @param options Optional options to pass to the internal collector
   * @example
   * // Create a reaction collector
   * const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someId'
   * message.awaitReactions({ filter, time: 15_000 })
   *   .then(collected => console.log(`Collected ${collected.size} reactions`))
   *   .catch(console.error);
   */
  public awaitReactions(options?: AwaitReactionsOptions): Promise<Collection<Snowflake | string, MessageReaction>>;

  /**
   * Creates a reaction collector.
   * @param options Options to send to the collector
   * @example
   * // Create a reaction collector
   * const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === 'someId';
   * const collector = message.createReactionCollector({ filter, time: 15_000 });
   * collector.on('collect', r => console.log(`Collected ${r.emoji.name}`));
   * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
   */
  public createReactionCollector(options?: ReactionCollectorOptions): ReactionCollector;

  /**
   * Creates a message component interaction collector.
   * @param options Options to send to the collector
   * @example
   * // Create a message component interaction collector
   * const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';
   * const collector = message.createMessageComponentCollector({ filter, time: 15_000 });
   * collector.on('collect', i => console.log(`Collected ${i.customId}`));
   * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
   */
  public createMessageComponentCollector<T extends MessageComponentTypeResolvable = 'ACTION_ROW'>(
    options?: MessageCollectorOptionsParams<T, Cached>,
  ): InteractionCollector<MappedInteractionTypes<Cached>[T]>;

  /**
   * Deletes the message.
   * @example
   * // Delete a message
   * message.delete()
   *   .then(msg => console.log(`Deleted message from ${msg.author.username}`))
   *   .catch(console.error);
   */
  public delete(): Promise<Message>;

  /**
   * Edits the content of the message.
   * @param options The options to provide
   * @example
   * // Update the content of a message
   * message.edit('This is my new content!')
   *   .then(msg => console.log(`Updated the content of a message to ${msg.content}`))
   *   .catch(console.error);
   */
  public edit(content: string | MessageEditOptions | MessagePayload): Promise<Message>;

  /**
   * Used mainly internally. Whether two messages are identical in properties. If you want to compare messages
   * without checking all the properties, use `message.id === message2.id`, which is much more efficient. This
   * method allows you to see if there are differences in content, embeds, attachments, nonce and tts properties.
   * @param message The message to compare it to
   * @param rawData Raw data passed through the WebSocket about this message
   */
  public equals(message: Message, rawData: unknown): boolean;

  /**
   * Fetches the Message this crosspost/reply/pin-add references, if available to the client
   */
  public fetchReference(): Promise<Message>;

  /**
   * Fetches the webhook used to create this message.
   */
  public fetchWebhook(): Promise<Webhook>;

  /**
   * Publishes a message in an announcement channel to all channels following it.
   * @example
   * // Crosspost a message
   * if (message.channel.type === 'GUILD_NEWS') {
   *   message.crosspost()
   *     .then(() => console.log('Crossposted message'))
   *     .catch(console.error);
   * }
   */
  public crosspost(): Promise<Message>;

  /**
   * Fetch this message.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<Message>;

  /**
   * Pins this message to the channel's pinned messages.
   * @example
   * // Pin a message
   * message.pin()
   *   .then(console.log)
   *   .catch(console.error)
   */
  public pin(): Promise<Message>;

  /**
   * Adds a reaction to the message.
   * @param emoji The emoji to react with
   * @example
   * // React to a message with a unicode emoji
   * message.react('🤔')
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // React to a message with a custom emoji
   * message.react(message.guild.emojis.cache.get('123456789012345678'))
   *   .then(console.log)
   *   .catch(console.error);
   */
  public react(emoji: EmojiIdentifierResolvable): Promise<MessageReaction>;

  /**
   * Removes the attachments from this message.
   */
  public removeAttachments(): Promise<Message>;

  /**
   * Send an inline reply to this message.
   * @param options The options to provide
   * @example
   * // Reply to a message
   * message.reply('This is a reply!')
   *   .then(() => console.log(`Replied to message "${message.content}"`))
   *   .catch(console.error);
   */
  public reply(options: string | MessagePayload | ReplyMessageOptions): Promise<Message>;

  /**
   * Resolves a component by a custom id.
   * @param customId The custom id to resolve against
   */
  public resolveComponent(customId: string): MessageActionRowComponent | null;

  /**
   * Create a new public thread from this message
   * @see {@link ThreadManager.create}
   * @param options Options for starting a thread on this message
   */
  public startThread(options: StartThreadOptions): Promise<ThreadChannel>;

  /**
   * Suppresses or unsuppresses embeds on a message.
   * @param suppress If the embeds should be suppressed or not
   */
  public suppressEmbeds(suppress?: boolean): Promise<Message>;

  /**
   * Transforms the message to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically concatenates the message's content instead of the object.
   * @example
   * // Logs: Message: This is a message!
   * console.log(`Message: ${message}`);
   */
  public toString(): string;

  /**
   * Unpins this message from the channel's pinned messages.
   * @example
   * // Unpin a message
   * message.unpin()
   *   .then(console.log)
   *   .catch(console.error)
   */
  public unpin(): Promise<Message>;

  /**
   * Whether this message is from a guild.
   */
  public inGuild(): this is Message<true> & this;
}

/**
 * Represents an action row containing message components.
 */
export class MessageActionRow extends BaseMessageComponent {
  /**
   * @param data MessageActionRow to clone or raw data
   */
  public constructor(data?: MessageActionRow | MessageActionRowOptions | APIActionRowComponent);

  /**
   * The type of this component
   */
  public type: 'ACTION_ROW';

  /**
   * The components in this action row
   */
  public components: MessageActionRowComponent[];

  /**
   * Adds components to the action row.
   * @param components The components to add
   */
  public addComponents(
    ...components: MessageActionRowComponentResolvable[] | MessageActionRowComponentResolvable[][]
  ): this;

  /**
   * Sets the components of the action row.
   * @param components The components to set
   */
  public setComponents(
    ...components: MessageActionRowComponentResolvable[] | MessageActionRowComponentResolvable[][]
  ): this;

  /**
   * Removes, replaces, and inserts components in the action row.
   * @param index The index to start at
   * @param deleteCount The number of components to remove
   * @param components The replacing components
   */
  public spliceComponents(
    index: number,
    deleteCount: number,
    ...components: MessageActionRowComponentResolvable[] | MessageActionRowComponentResolvable[][]
  ): this;

  /**
   * Transforms the action row to a plain object.
   * @returns The raw data of this action row
   */
  public toJSON(): APIActionRowComponent;
}

/**
 * Represents an attachment in a message.
 */
export class MessageAttachment {
  /**
   * @param attachment The file
   * @param name The name of the file, if any
   * @param data Extra data
   */
  public constructor(attachment: BufferResolvable | Stream, name?: string, data?: RawMessageAttachmentData);

  /**
   * The file
   */
  public attachment: BufferResolvable | Stream;

  /**
   * This media type of this attachment
   */
  public contentType: string | null;

  /**
   * The description (alt text) of this attachment
   */
  public description: string | null;

  /**
   * Whether this attachment is ephemeral
   */
  public ephemeral: boolean;

  /**
   * The height of this attachment (if an image or video)
   */
  public height: number | null;

  /**
   * The attachment's id
   */
  public id: Snowflake;

  /**
   * The name of this attachment
   */
  public name: string | null;

  /**
   * The Proxy URL to this attachment
   */
  public proxyURL: string;

  /**
   * The size of this attachment in bytes
   */
  public size: number;

  /**
   * Whether or not this attachment has been marked as a spoiler
   */
  public readonly spoiler: boolean;

  /**
   * The URL to this attachment
   */
  public url: string;

  /**
   * The width of this attachment (if an image or video)
   */
  public width: number | null;

  /**
   * Sets the description of this attachment.
   * @param description The description of the file
   * @returns This attachment
   */
  public setDescription(description: string): this;

  /**
   * Sets the file of this attachment.
   * @param attachment The file
   * @param name The name of the file, if any
   * @returns This attachment
   */
  public setFile(attachment: BufferResolvable | Stream, name?: string): this;

  /**
   * Sets the name of this attachment.
   * @param name The name of the file
   * @returns This attachment
   */
  public setName(name: string): this;

  /**
   * Sets whether this attachment is a spoiler
   * @param spoiler Whether the attachment should be marked as a spoiler
   * @returns This attachment
   */
  public setSpoiler(spoiler?: boolean): this;

  /**
   * Transforms the message attachment to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Represents a button message component.
 */
export class MessageButton extends BaseMessageComponent {
  /**
   * @param data MessageButton to clone or raw data
   */
  public constructor(data?: MessageButton | MessageButtonOptions | APIButtonComponent);

  /**
   * A unique string to be sent in the interaction when clicked
   */
  public customId: string | null;

  /**
   * Whether this button is currently disabled
   */
  public disabled: boolean;

  /**
   * Emoji for this button
   */
  public emoji: APIPartialEmoji | null;

  /**
   * The text to be displayed on this button
   */
  public label: string | null;

  /**
   * The style of this button
   */
  public style: MessageButtonStyle | null;

  /**
   * The type of this component
   */
  public type: 'BUTTON';

  /**
   * The URL this button links to, if it is a Link style button
   */
  public url: string | null;

  /**
   * Sets the custom id for this button
   * @param customId A unique string to be sent in the interaction when clicked
   */
  public setCustomId(customId: string): this;

  /**
   * Sets the interactive status of the button
   * @param disabled Whether this button should be disabled
   */
  public setDisabled(disabled?: boolean): this;

  /**
   * Set the emoji of this button
   * @param emoji The emoji to be displayed on this button
   */
  public setEmoji(emoji: EmojiIdentifierResolvable): this;

  /**
   * Sets the label of this button
   * @param label The text to be displayed on this button
   */
  public setLabel(label: string): this;

  /**
   * Sets the style of this button
   * @param style The style of this button
   */
  public setStyle(style: MessageButtonStyleResolvable): this;

  /**
   * Sets the URL of this button.
   * <info>{@link MessageButton.style} must be LINK when setting a URL</info>
   * @param url The URL of this button
   */
  public setURL(url: string): this;

  /**
   * Transforms the button to a plain object.
   * @returns The raw data of this button
   */
  public toJSON(): APIButtonComponent;

  /**
   * Resolves the style of a button
   * @param style The style to resolve
   */
  private static resolveStyle(style: MessageButtonStyleResolvable): MessageButtonStyle;
}

/**
 * Collects messages on a channel.
 * Will automatically stop if the channel ({@link ClientEvents.channelDelete channelDelete}),
 * thread ({@link ClientEvents.threadDelete threadDelete}), or
 * guild ({@link ClientEvents.guildDelete guildDelete}) is deleted.
 */
export class MessageCollector extends Collector<Snowflake, Message> {
  /**
   * @param channel The channel
   * @param options The options to be applied to this collector
   * @emits MessageCollector.message
   */
  public constructor(channel: TextBasedChannel, options?: MessageCollectorOptions);

  /**
   * Handles checking if the channel has been deleted, and if so, stops the collector with the reason 'channelDelete'.
   * @param channel The channel that was deleted
   */
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;

  /**
   * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
   * @param guild The guild that was deleted
   */
  private _handleGuildDeletion(guild: Guild): void;

  /**
   * The channel
   */
  public channel: TextBasedChannel;

  /**
   * The reason this collector has ended with, or null if it hasn't ended yet
   */
  public readonly endReason: string | null;

  /**
   * The options of this collector
   */
  public options: MessageCollectorOptions;

  /**
   * Total number of messages that were received in the channel during message collection
   */
  public received: number;

  /**
   * Handles a message for possible collection.
   * @param message The message that could be collected
   */
  public collect(message: Message): Snowflake | null;

  /**
   * Handles a message for possible disposal.
   * @param message The message that could be disposed of
   */
  public dispose(message: Message): Snowflake | null;
}

/**
 * Represents a message component interaction.
 */
export class MessageComponentInteraction<Cached extends CacheType = CacheType> extends Interaction<Cached> {
  public constructor(client: Client, data: RawMessageComponentInteractionData);

  /**
   * The component which was interacted with
   */
  public readonly component: CacheTypeReducer<
    Cached,
    MessageActionRowComponent,
    Exclude<APIMessageComponent, APIActionRowComponent>,
    MessageActionRowComponent | Exclude<APIMessageComponent, APIActionRowComponent>,
    MessageActionRowComponent | Exclude<APIMessageComponent, APIActionRowComponent>
  >;

  /**
   * The type of component which was interacted with
   */
  public componentType: Exclude<MessageComponentType, 'ACTION_ROW'>;

  /**
   * The custom id of the component which was interacted with
   */
  public customId: string;

  /**
   * The id of the channel this interaction was sent in
   */
  public channelId: Snowflake;

  /**
   * Whether the reply to this interaction has been deferred
   */
  public deferred: boolean;

  /**
   * Whether the reply to this interaction is ephemeral
   */
  public ephemeral: boolean | null;

  /**
   * The message to which the component was attached
   */
  public message: GuildCacheMessage<Cached>;

  /**
   * Whether this interaction has already been replied to
   */
  public replied: boolean;

  /**
   * An associated interaction webhook, can be used to further interact with this interaction
   */
  public webhook: InteractionWebhook;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is MessageComponentInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is MessageComponentInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is MessageComponentInteraction<'raw'>;

  /**
   * Defers the reply to this interaction.
   * @param options Options for deferring the reply to this interaction
   * @example
   * // Defer the reply to this interaction
   * interaction.deferReply()
   *   .then(console.log)
   *   .catch(console.error)
   * @example
   * // Defer to send an ephemeral reply later
   * interaction.deferReply({ ephemeral: true })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public deferReply(options: InteractionDeferReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferReply(options?: InteractionDeferReplyOptions): Promise<void>;

  /**
   * Defers an update to the message to which the component was attached.
   * @param options Options for deferring the update to this interaction
   * @example
   * // Defer updating and reset the component's loading state
   * interaction.deferUpdate()
   *   .then(console.log)
   *   .catch(console.error);
   */
  public deferUpdate(options: InteractionDeferUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public deferUpdate(options?: InteractionDeferUpdateOptions): Promise<void>;

  /**
   * Deletes the initial reply to this interaction.
   * @see {@link Webhook.deleteMessage}
   * @example
   * // Delete the reply to this interaction
   * interaction.deleteReply()
   *   .then(console.log)
   *   .catch(console.error);
   */
  public deleteReply(): Promise<void>;

  /**
   * Edits the initial reply to this interaction.
   * @see {@link Webhook.editMessage}
   * @param options The new options for the message
   * @example
   * // Edit the reply to this interaction
   * interaction.editReply('New content')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public editReply(options: string | MessagePayload | WebhookEditMessageOptions): Promise<GuildCacheMessage<Cached>>;

  /**
   * Fetches the initial reply to this interaction.
   * @see {@link Webhook.fetchMessage}
   * @example
   * // Fetch the reply to this interaction
   * interaction.fetchReply()
   *   .then(reply => console.log(`Replied with ${reply.content}`))
   *   .catch(console.error);
   */
  public fetchReply(): Promise<GuildCacheMessage<Cached>>;

  /**
   * Send a follow-up message to this interaction.
   * @param options The options for the reply
   */
  public followUp(options: string | MessagePayload | InteractionReplyOptions): Promise<GuildCacheMessage<Cached>>;

  /**
   * Creates a reply to this interaction.
   * <info>Use the `fetchReply` option to get the bot's reply message.</info>
   * @param options The options for the reply
   * @example
   * // Reply to the interaction and fetch the response
   * interaction.reply({ content: 'Pong!', fetchReply: true })
   *   .then((message) => console.log(`Reply sent with content ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Create an ephemeral reply with an embed
   * const embed = new MessageEmbed().setDescription('Pong!');
   *
   * interaction.reply({ embeds: [embed], ephemeral: true })
   *   .then(() => console.log('Reply sent.'))
   *   .catch(console.error);
   */
  public reply(options: InteractionReplyOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public reply(options: string | MessagePayload | InteractionReplyOptions): Promise<void>;

  /**
   * Updates the original message of the component on which the interaction was received on.
   * @param options The options for the updated message
   * @example
   * // Remove the components from the message
   * interaction.update({
   *   content: "A component interaction was received",
   *   components: []
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public update(options: InteractionUpdateOptions & { fetchReply: true }): Promise<GuildCacheMessage<Cached>>;
  public update(options: string | MessagePayload | InteractionUpdateOptions): Promise<void>;

  /**
   * Resolves the type of a MessageComponent
   * @param type The type to resolve
   */
  public static resolveType(type: MessageComponentTypeResolvable): MessageComponentType;
}

/**
 * Represents a message context menu interaction.
 */
export class MessageContextMenuInteraction<
  Cached extends CacheType = CacheType,
> extends ContextMenuInteraction<Cached> {
  /**
   * The message this interaction was sent from
   */
  public readonly targetMessage: NonNullable<CommandInteractionOption<Cached>['message']>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is MessageContextMenuInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is MessageContextMenuInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is MessageContextMenuInteraction<'raw'>;
}

/**
 * Represents an embed in a message (image/video preview, rich embed, etc.)
 */
export class MessageEmbed {
  /**
   * Compares two given embed fields to see if they are equal
   * @param field The first field to compare
   * @param other The second field to compare
   */
  private _fieldEquals(field: EmbedField, other: EmbedField): boolean;

  /**
   * @param data MessageEmbed to clone or raw embed data
   */
  public constructor(data?: MessageEmbed | MessageEmbedOptions | APIEmbed);

  /**
   * The author of this embed (if there is one)
   */
  public author: MessageEmbedAuthor | null;

  /**
   * The color of this embed
   */
  public color: number | null;

  /**
   * The date displayed on this embed
   */
  public readonly createdAt: Date | null;

  /**
   * The description of this embed
   */
  public description: string | null;

  /**
   * The fields of this embed
   */
  public fields: EmbedField[];

  /**
   * The footer of this embed
   */
  public footer: MessageEmbedFooter | null;

  /**
   * The hexadecimal version of the embed color, with a leading hash
   */
  public readonly hexColor: HexColorString | null;

  /**
   * The image of this embed, if there is one
   */
  public image: MessageEmbedImage | null;

  /**
   * The accumulated length for the embed title, description, fields, footer text, and author name
   */
  public readonly length: number;

  /**
   * The provider of this embed (if there is one)
   */
  public provider: MessageEmbedProvider | null;

  /**
   * The thumbnail of this embed (if there is one)
   */
  public thumbnail: MessageEmbedThumbnail | null;

  /**
   * The timestamp of this embed
   */
  public timestamp: number | null;

  /**
   * The title of this embed
   */
  public title: string | null;

  /**
   * The type of this embed
   * @see {@link [Embed Types](https://discord.com/developers/docs/resources/channel#embed-object-embed-types)}
   * @deprecated
   */
  public type: string;

  /**
   * The URL of this embed
   */
  public url: string | null;

  /**
   * The video of this embed (if there is one)
   */
  public readonly video: MessageEmbedVideo | null;

  /**
   * Adds a field to the embed (max 25).
   * @param name The name of this field
   * @param value The value of this field
   * @param inline If this field will be displayed inline
   */
  public addField(name: string, value: string, inline?: boolean): this;

  /**
   * Adds fields to the embed (max 25).
   * @param fields The fields to add
   */
  public addFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): this;

  /**
   * Sets the embed's fields (max 25).
   * @param fields The fields to set
   */
  public setFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): this;

  /**
   * Sets the author of this embed.
   * @param options The options to provide for the author.
   * Provide `null` to remove the author data.
   */
  public setAuthor(options: EmbedAuthorData | null): this;

  /**
   * Sets the author of this embed.
   * @param name The name of the author
   * @param iconURL The icon URL of the author
   * @param url The URL of the author
   * @deprecated Supply a lone object of interface {@link EmbedAuthorData} instead of more parameters.
   */
  public setAuthor(name: string, iconURL?: string, url?: string): this;

  /**
   * Sets the color of this embed.
   * @param color The color of the embed
   */
  public setColor(color: ColorResolvable): this;

  /**
   * Sets the description of this embed.
   * @param description The description
   */
  public setDescription(description: string): this;

  /**
   * Sets the footer of this embed.
   * @param options The options to provide for the footer. Provide `null` to remove the footer data.
   */
  public setFooter(options: EmbedFooterData | null): this;

  /**
   * Sets the footer of this embed.
   * @param text The text of the footer
   * @param iconURL The icon URL of the footer
   * @deprecated Supply a lone object of interface {@link EmbedFooterData} instead.
   */
  public setFooter(text: string, iconURL?: string): this;

  /**
   * Sets the image of this embed.
   * @param url The URL of the image
   */
  public setImage(url: string): this;

  /**
   * Sets the thumbnail of this embed.
   * @param url The URL of the thumbnail
   */
  public setThumbnail(url: string): this;

  /**
   * Sets the timestamp of this embed.
   * @param timestamp The timestamp or date.
   * If `null` then the timestamp will be unset (i.e. when editing an existing {@link MessageEmbed})
   */
  public setTimestamp(timestamp?: Date | number | null): this;

  /**
   * Sets the title of this embed.
   * @param title The title
   */
  public setTitle(title: string): this;

  /**
   * Sets the URL of this embed.
   * @param url The URL
   */
  public setURL(url: string): this;

  /**
   * Removes, replaces, and inserts fields in the embed (max 25).
   * @param index The index to start at
   * @param deleteCount The number of fields to remove
   * @param fields The replacing field objects
   */
  public spliceFields(index: number, deleteCount: number, ...fields: EmbedFieldData[] | EmbedFieldData[][]): this;

  /**
   * Checks if this embed is equal to another one by comparing every single one of their properties.
   * @param embed The embed to compare with
   */
  public equals(embed: MessageEmbed | APIEmbed): boolean;

  /**
   * Transforms the embed to a plain object.
   * @returns The raw data of this embed
   */
  public toJSON(): APIEmbed;

  /**
   * Normalizes field input and verifies strings.
   * @param name The name of the field
   * @param value The value of the field
   * @param inline Set the field to display inline
   */
  public static normalizeField(name: string, value: string, inline?: boolean): Required<EmbedFieldData>;

  /**
   * Normalizes field input and resolves strings.
   * @param fields Fields to normalize
   */
  public static normalizeFields(...fields: EmbedFieldData[] | EmbedFieldData[][]): Required<EmbedFieldData>[];
}

/**
 * Data structure that makes it easy to interact with a {@link Message.flags} bitfield.
 */
export class MessageFlags extends BitField<MessageFlagsString> {
  /**
   * Numeric message flags.
   * @see {@link [Message Flags](https://discord.com/developers/docs/resources/channel#message-object-message-flags)}
   */
  public static FLAGS: Record<MessageFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<MessageFlagsString, number>): number;
}

/**
 * Keeps track of mentions in a {@link Message}.
 */
export class MessageMentions {
  public constructor(
    message: Message,
    users: APIUser[] | Collection<Snowflake, User>,
    roles: Snowflake[] | Collection<Snowflake, Role>,
    everyone: boolean,
    repliedUser?: APIUser | User,
  );
  /**
   * Cached channels for {@link MessageMentions.channels}
   */
  private _channels: Collection<Snowflake, TextBasedChannel> | null;

  /**
   * The initial message content
   */
  private readonly _content: string;

  /**
   * Cached members for {@link MessageMentions.members}
   */
  private _members: Collection<Snowflake, GuildMember> | null;

  /**
   * Any channels that were mentioned
   * <info>Order as they appear first in the message content</info>
   */
  public readonly channels: Collection<Snowflake, TextBasedChannel>;

  /**
   * The client the message is from
   */
  public readonly client: Client;

  /**
   * Whether `@everyone` or `@here` were mentioned
   */
  public everyone: boolean;

  /**
   * The guild the message is in
   */
  public readonly guild: Guild;

  /**
   * Checks if a user, guild member, role, or channel is mentioned.
   * Takes into account user mentions, role mentions, and `@everyone`/`@here` mentions.
   * @param data The User/Role/Channel to check for
   * @param options The options for the check
   */
  public has(data: UserResolvable | RoleResolvable | ChannelResolvable, options?: MessageMentionsHasOptions): boolean;

  /**
   * Any members that were mentioned (only in {@link Guild}s)
   * <info>Order as received from the API, not as they appear in the message content</info>
   */
  public readonly members: Collection<Snowflake, GuildMember> | null;

  /**
   * The author of the message that this message is a reply to
   */
  public repliedUser: User | null;

  /**
   * Any roles that were mentioned
   * <info>Order as received from the API, not as they appear in the message content</info>
   */
  public roles: Collection<Snowflake, Role>;

  /**
   * Any users that were mentioned
   * <info>Order as received from the API, not as they appear in the message content</info>
   */
  public users: Collection<Snowflake, User>;

  /**
   * A collection of crossposted channels
   * <info>Order as received from the API, not as they appear in the message content</info>
   */
  public crosspostedChannels: Collection<Snowflake, CrosspostedChannel>;

  /**
   * Transforms the message embeds to a plain object.
   */
  public toJSON(): unknown;

  /**
   * Regular expression that globally matches channel mentions like `<#222079895583457280>`
   */
  public static CHANNELS_PATTERN: RegExp;

  /**
   * Regular expression that globally matches `@everyone` and `@here`
   */
  public static EVERYONE_PATTERN: RegExp;

  /**
   * Regular expression that globally matches role mentions like `<@&297577916114403338>`
   */
  public static ROLES_PATTERN: RegExp;

  /**
   * Regular expression that globally matches user mentions like `<@81440962496172032>`
   */
  public static USERS_PATTERN: RegExp;
}

/**
 * Represents a message to be sent to the API.
 */
export class MessagePayload {
  /**
   * @param target The target for this message to be sent to
   * @param options Options passed in from send
   */
  public constructor(target: MessageTarget, options: MessageOptions | WebhookMessageOptions);

  /**
   * Data sendable to the API
   */
  public data: RawMessagePayloadData | null;

  /**
   * Whether or not the target is a {@link User}
   */
  public readonly isUser: boolean;

  /**
   * Whether or not the target is a {@link Webhook} or a {@link WebhookClient}
   */
  public readonly isWebhook: boolean;

  /**
   * Whether or not the target is a {@link Message}
   */
  public readonly isMessage: boolean;

  /**
   * Whether or not the target is a {@link MessageManager}
   */
  public readonly isMessageManager: boolean;

  /**
   * Whether or not the target is an {@link Interaction} or an {@link InteractionWebhook}
   */
  public readonly isInteraction: boolean;

  /**
   * Files sendable to the API
   */
  public files: HTTPAttachmentData[] | null;

  /**
   * Options passed in from send
   */
  public options: MessageOptions | WebhookMessageOptions;

  /**
   * The target for this message to be sent to
   */
  public target: MessageTarget;

  /**
   * Creates a {@link MessagePayload} from user-level arguments.
   * @param target Target to send to
   * @param options Options or content to use
   * @param extra Extra options to add onto specified options
   */
  public static create(
    target: MessageTarget,
    options: string | MessageOptions | WebhookMessageOptions,
    extra?: MessageOptions | WebhookMessageOptions,
  ): MessagePayload;

  /**
   * Resolves a single file into an object sendable to the API.
   * @param fileLike Something that could be resolved to a file
   */
  public static resolveFile(
    fileLike: BufferResolvable | Stream | FileOptions | MessageAttachment,
  ): Promise<HTTPAttachmentData>;

  /**
   * Makes the content of this message.
   */
  public makeContent(): string | undefined;

  /**
   * Resolves data.
   */
  public resolveData(): this;

  /**
   * Resolves files.
   */
  public resolveFiles(): Promise<this>;
}

/**
 * Represents a reaction to a message.
 */
export class MessageReaction {
  /**
   * @param client The instantiating client
   * @param data The data for the message reaction
   * @param message The message the reaction refers to
   */
  public constructor(client: Client, data: RawMessageReactionData, message: Message);

  /**
   * The emoji of this reaction.
   */
  private _emoji: GuildEmoji | ReactionEmoji;

  /**
   * The client that instantiated this message reaction
   */
  public readonly client: Client;

  /**
   * The number of people that have given the same reaction
   */
  public count: number;

  /**
   * The emoji of this reaction. Either a {@link GuildEmoji} object for known custom emojis, or a {@link ReactionEmoji}
   * object which has fewer properties. Whatever the prototype of the emoji, it will still have
   * `name`, `id`, `identifier` and `toString()`
   */
  public readonly emoji: GuildEmoji | ReactionEmoji;

  /**
   * Whether the client has given this reaction
   */
  public me: boolean;

  /**
   * The message that this reaction refers to
   */
  public message: Message | PartialMessage;

  /**
   * Whether or not this reaction is a partial
   */
  public readonly partial: false;

  /**
   * A manager of the users that have given this reaction
   */
  public users: ReactionUserManager;

  /**
   * Removes all users from this reaction.
   */
  public remove(): Promise<MessageReaction>;

  /**
   * Fetch this reaction.
   */
  public fetch(): Promise<MessageReaction>;

  /**
   * Transforms the message reaction to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Represents a select menu message component
 */
export class MessageSelectMenu extends BaseMessageComponent {
  /**
   * @param data MessageSelectMenu to clone or raw data
   */
  public constructor(data?: MessageSelectMenu | MessageSelectMenuOptions | APISelectMenuComponent);

  /**
   * A unique string to be sent in the interaction when clicked
   */
  public customId: string | null;

  /**
   * Whether this select menu is currently disabled
   */
  public disabled: boolean;

  /**
   * The maximum number of selections allowed
   */
  public maxValues: number | null;

  /**
   * The minimum number of selections required
   */
  public minValues: number | null;

  /**
   * Options for the select menu
   */
  public options: MessageSelectOption[];

  /**
   * Custom placeholder text to display when nothing is selected
   */
  public placeholder: string | null;

  /**
   * The type of this component
   */
  public type: 'SELECT_MENU';

  /**
   * Adds options to the select menu.
   * @param options The options to add
   */
  public addOptions(...options: MessageSelectOptionData[] | MessageSelectOptionData[][]): this;

  /**
   * Sets the options of the select menu.
   * @param options The options to set
   */
  public setOptions(...options: MessageSelectOptionData[] | MessageSelectOptionData[][]): this;

  /**
   * Sets the custom id of this select menu
   * @param customId A unique string to be sent in the interaction when clicked
   */
  public setCustomId(customId: string): this;

  /**
   * Sets the interactive status of the select menu
   * @param disabled Whether this select menu should be disabled
   */
  public setDisabled(disabled?: boolean): this;

  /**
   * Sets the maximum number of selections allowed for this select menu
   * @param maxValues Number of selections to be allowed
   */
  public setMaxValues(maxValues: number): this;

  /**
   * Sets the minimum number of selections required for this select menu
   * <info>This will default the maxValues to the number of options, unless manually set</info>
   * @param minValues Number of selections to be required
   */
  public setMinValues(minValues: number): this;

  /**
   * Sets the placeholder of this select menu
   * @param placeholder Custom placeholder text to display when nothing is selected
   */
  public setPlaceholder(placeholder: string): this;

  /**
   * Removes, replaces, and inserts options in the select menu.
   * @param index The index to start at
   * @param deleteCount The number of options to remove
   * @param options The replacing option objects
   */
  public spliceOptions(
    index: number,
    deleteCount: number,
    ...options: MessageSelectOptionData[] | MessageSelectOptionData[][]
  ): this;

  /**
   * Transforms the select menu into a plain object
   * @returns The raw data of this select menu
   */
  public toJSON(): APISelectMenuComponent;
}

/**
 * Represents a guild news channel on Discord.
 */
export class NewsChannel extends BaseGuildTextChannel {
  /**
   * A manager of the threads belonging to this channel
   */
  public threads: ThreadManager<AllowedThreadTypeForNewsChannel>;

  /**
   * The type of the channel
   */
  public type: 'GUILD_NEWS';

  /**
   * Adds the target to this channel's followers.
   * @param channel The channel where the webhook should be created
   * @param reason Reason for creating the webhook
   * @example
   * if (channel.type === 'GUILD_NEWS') {
   *   channel.addFollower('222197033908436994', 'Important announcements')
   *     .then(() => console.log('Added follower'))
   *     .catch(console.error);
   * }
   */
  public addFollower(channel: TextChannelResolvable, reason?: string): Promise<NewsChannel>;
}

/**
 * A partial guild received when using {@link GuildManager.fetch} to fetch multiple guilds.
 */
export class OAuth2Guild extends BaseGuild {
  public constructor(client: Client, data: RawOAuth2GuildData);

  /**
   * Whether the client user is the owner of the guild
   */
  public owner: boolean;

  /**
   * The permissions that the client user has in this guild
   */
  public permissions: Readonly<Permissions>;
}

/**
 * Represents a Partial Group DM Channel on Discord.
 */
export class PartialGroupDMChannel extends Channel {
  public constructor(client: Client, data: RawPartialGroupDMChannelData);

  /**
   * The name of this Group DM Channel
   */
  public name: string | null;

  /**
   * The hash of the channel icon
   */
  public icon: string | null;

  /**
   * The recipients of this Group DM Channel.
   */
  public recipients: PartialRecipient[];

  /**
   * The URL to this channel's icon.
   * @param options Options for the Image URL
   */
  public iconURL(options?: StaticImageURLOptions): string | null;
}

/**
 * Represents a permission overwrite for a role or member in a guild channel.
 */
export class PermissionOverwrites extends Base {
  public constructor(client: Client, data: RawPermissionOverwriteData, channel: NonThreadGuildBasedChannel);

  /**
   * The permissions that are allowed for the user or role.
   */
  public allow: Readonly<Permissions>;

  /**
   * The GuildChannel this overwrite is for
   */
  public readonly channel: NonThreadGuildBasedChannel;

  /**
   * The permissions that are denied for the user or role.
   */
  public deny: Readonly<Permissions>;

  /**
   * The overwrite's id, either a {@link User} or a {@link Role} id
   */
  public id: Snowflake;

  /**
   * The type of this overwrite
   */
  public type: OverwriteType;

  /**
   * Edits this Permission Overwrite.
   * @param options The options for the update
   * @param reason Reason for creating/editing this overwrite
   * @example
   * // Update permission overwrites
   * permissionOverwrites.edit({
   *   SEND_MESSAGES: false
   * })
   *   .then(channel => console.log(channel.permissionOverwrites.get(message.author.id)))
   *   .catch(console.error);
   */
  public edit(options: PermissionOverwriteOptions, reason?: string): Promise<PermissionOverwrites>;

  /**
   * Deletes this Permission Overwrite.
   * @param reason Reason for deleting this overwrite
   */
  public delete(reason?: string): Promise<PermissionOverwrites>;

  /**
   * Transforms the permission overwrites to a plain object.
   */
  public toJSON(): unknown;

  /**
   * Resolves bitfield permissions overwrites from an object.
   * @param options The options for the update
   * @param initialPermissions The initial permissions
   */
  public static resolveOverwriteOptions(
    options: PermissionOverwriteOptions,
    initialPermissions: { allow?: PermissionResolvable; deny?: PermissionResolvable },
  ): ResolvedOverwriteOptions;

  /**
   * Resolves an overwrite into {@link RawOverwriteData}.
   * @param overwrite The overwrite-like data to resolve
   * @param guild The guild to resolve from
   */
  public static resolve(overwrite: OverwriteResolvable, guild: Guild): APIOverwrite;
}

/**
 * Data structure that makes it easy to interact with a permission bitfield. All {@link GuildMember}s have a set of
 * permissions in their guild, and each channel in the guild may also have {@link PermissionOverwrites} for the member
 * that override their default permissions.
 */
export class Permissions extends BitField<PermissionString, bigint> {
  /**
   * Checks whether the bitfield has a permission, or any of multiple permissions.
   * @param permission Permission(s) to check for
   * @param checkAdmin Whether to allow the administrator permission to override
   */
  public any(permission: PermissionResolvable, checkAdmin?: boolean): boolean;

  /**
   * Checks whether the bitfield has a permission, or multiple permissions.
   * @param permission Permission(s) to check for
   * @param checkAdmin Whether to allow the administrator permission to override
   */
  public has(permission: PermissionResolvable, checkAdmin?: boolean): boolean;

  /**
   * Gets all given bits that are missing from the bitfield.
   * @param bits Bit(s) to check for
   * @param checkAdmin Whether to allow the administrator permission to override
   */
  public missing(bits: BitFieldResolvable<PermissionString, bigint>, checkAdmin?: boolean): PermissionString[];

  /**
   * Gets an object mapping field names to a boolean indicating whether the
   * bit is available.
   * @param hasParams Additional parameters for the has method, if any
   */
  public serialize(checkAdmin?: boolean): Record<PermissionString, boolean>;

  /**
   * Gets an {@link Array} of bitfield names based on the permissions available.
   */
  public toArray(): PermissionString[];

  /**
   * Bitfield representing every permission combined
   */
  public static ALL: bigint;

  /**
   * Bitfield representing the default permissions for users
   */
  public static DEFAULT: bigint;

  /**
   * Bitfield representing the permissions required for moderators of stage channels
   */
  public static STAGE_MODERATOR: bigint;

  /**
   * Numeric permission flags.
   * @see {@link [Bitwise Permission Flags](https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags)}
   */
  public static FLAGS: PermissionFlags;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(permission?: PermissionResolvable): bigint;
}

/**
 * Represents a user's presence.
 */
export class Presence extends Base {
  /**
   * @param client The instantiating client
   * @param data The data for the presence
   */
  public constructor(client: Client, data?: RawPresenceData);

  /**
   * The activities of this presence
   */
  public activities: Activity[];

  /**
   * The devices this presence is on
   */
  public clientStatus: ClientPresenceStatusData | null;

  /**
   * The guild this presence is in
   */
  public guild: Guild | null;

  /**
   * The member of this presence
   */
  public readonly member: GuildMember | null;

  /**
   * The status of this presence
   */
  public status: PresenceStatus;

  /**
   * The user of this presence
   */
  public readonly user: User | null;

  /**
   * The presence's user id
   */
  public userId: Snowflake;

  /**
   * Whether this presence is equal to another.
   * @param presence The presence to compare with
   */
  public equals(presence: Presence): boolean;
}

/**
 * Collects reactions on messages.
 * Will automatically stop if the message ({@link ClientEvents.messageDelete messageDelete} or
 * {@link ClientEvents.messageDeleteBulk messageDeleteBulk}),
 * channel ({@link ClientEvents.channelDelete channelDelete}),
 * thread ({@link ClientEvents.threadDelete threadDelete}), or
 * guild ({@link ClientEvents.guildDelete guildDelete}) is deleted.
 */
export class ReactionCollector extends Collector<Snowflake | string, MessageReaction, [User]> {
  /**
   * @param message The message upon which to collect reactions
   * @param options The options to apply to this collector
   */
  public constructor(message: Message, options?: ReactionCollectorOptions);

  /**
   * Handles checking if the channel has been deleted, and if so, stops the collector with the reason 'channelDelete'.
   * @param channel The channel that was deleted
   */
  private _handleChannelDeletion(channel: NonThreadGuildBasedChannel): void;

  /**
   * Handles checking if the guild has been deleted, and if so, stops the collector with the reason 'guildDelete'.
   * @param guild The guild that was deleted
   */
  private _handleGuildDeletion(guild: Guild): void;

  /**
   * Handles checking if the message has been deleted, and if so, stops the collector with the reason 'messageDelete'.
   * @param message The message that was deleted
   */
  private _handleMessageDeletion(message: Message): void;

  /**
   * The reason this collector has ended with, or null if it hasn't ended yet
   */
  public readonly endReason: string | null;

  /**
   * The message upon which to collect reactions
   */
  public message: Message;

  /**
   * The options of this collector
   */
  public options: ReactionCollectorOptions;

  /**
   * The total number of reactions collected
   */
  public total: number;

  /**
   * The users that have reacted to this message
   */
  public users: Collection<Snowflake, User>;

  /**
   * Gets the collector key for a reaction.
   * @param reaction The message reaction to get the key for
   */
  public static key(reaction: MessageReaction): Snowflake | string;

  /**
   * Handles an incoming reaction for possible collection.
   * @param reaction The reaction to possibly collect
   * @param user The user that added the reaction
   */
  public collect(reaction: MessageReaction, user: User): Snowflake | string | null;

  /**
   * Handles a reaction deletion for possible disposal.
   * @param reaction The reaction to possibly dispose of
   * @param user The user that removed the reaction
   */
  public dispose(reaction: MessageReaction, user: User): Snowflake | string | null;

  /**
   * Empties this reaction collector.
   */
  public empty(): void;

  /**
   * **collect**: Emitted whenever a reaction is collected.
   *
   * **dispose**: Emitted when the reaction had all the users removed and the `dispose` option is set to true.
   *
   * **remove**: Emitted when the reaction had one user removed and the `dispose` option is set to true.
   * @param reaction The reaction that was collected/disposed of/removed
   * @param user The user that added/removed the reaction
   */
  public on(event: 'collect' | 'dispose' | 'remove', listener: (reaction: MessageReaction, user: User) => void): this;

  /**
   * Emitted when the collector is finished collecting.
   * @param collected The elements collected by the collector
   * @param reason The reason the collector ended
   */
  public on(event: 'end', listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void): this;

  public on(event: string, listener: (...args: any[]) => void): this;

  /**
   * **collect**: Emitted whenever a reaction is collected.
   *
   * **dispose**: Emitted when the reaction had all the users removed and the `dispose` option is set to true.
   *
   * **remove**: Emitted when the reaction had one user removed and the `dispose` option is set to true.
   * @param reaction The reaction that was collected/disposed of/removed
   * @param user The user that added/removed the reaction
   */
  public once(event: 'collect' | 'dispose' | 'remove', listener: (reaction: MessageReaction, user: User) => void): this;

  /**
   * Emitted when the collector is finished collecting.
   * @param collected The elements collected by the collector
   * @param reason The reason the collector ended
   */
  public once(
    event: 'end',
    listener: (collected: Collection<Snowflake, MessageReaction>, reason: string) => void,
  ): this;

  public once(event: string, listener: (...args: any[]) => void): this;
}

/**
 * Represents a limited emoji set used for both custom and unicode emojis. Custom emojis
 * will use this class opposed to the Emoji class when the client doesn't know enough
 * information about them.
 */
export class ReactionEmoji extends Emoji {
  public constructor(reaction: MessageReaction, emoji: RawReactionEmojiData);

  /**
   * The message reaction this emoji refers to
   */
  public reaction: MessageReaction;

  /**
   * Transforms the reaction emoji to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Assets for a rich presence
 */
export class RichPresenceAssets {
  public constructor(activity: Activity, assets: RawRichPresenceAssets);

  /**
   * The large image asset's id
   */
  public largeImage: Snowflake | null;

  /**
   * Hover text for the large image
   */
  public largeText: string | null;

  /**
   * The small image asset's id
   */
  public smallImage: Snowflake | null;

  /**
   * Hover text for the small image
   */
  public smallText: string | null;

  /**
   * Gets the URL of the small image asset
   * @param options Options for the image URL
   */
  public largeImageURL(options?: StaticImageURLOptions): string | null;

  /**
   * Gets the URL of the large image asset
   * @param options Options for the image URL
   */
  public smallImageURL(options?: StaticImageURLOptions): string | null;
}

/**
 * Represents a role on Discord.
 */
export class Role extends Base {
  /**
   * @param client The instantiating client
   * @param data The data for the role
   * @param guild The guild the role is part of
   */
  public constructor(client: Client, data: RawRoleData, guild: Guild);

  /**
   * The base 10 color of the role
   */
  public color: number;

  /**
   * The time the role was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the role was created at
   */
  public readonly createdTimestamp: number;

  /**
   * Whether the role has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * Whether the role is editable by the client user
   */
  public readonly editable: boolean;

  /**
   * The guild that the role belongs to
   */
  public guild: Guild;

  /**
   * The hexadecimal version of the role color, with a leading hashtag
   */
  public readonly hexColor: HexColorString;

  /**
   * If true, users that are part of this role will appear in a separate category in the users list
   */
  public hoist: boolean;

  /**
   * The role's id (unique to the guild it is part of)
   */
  public id: Snowflake;

  /**
   * Whether or not the role is managed by an external service
   */
  public managed: boolean;

  /**
   * The cached guild members that have this role
   */
  public readonly members: Collection<Snowflake, GuildMember>;

  /**
   * Whether or not the role can be mentioned by anyone
   */
  public mentionable: boolean;

  /**
   * The name of the role
   */
  public name: string;

  /**
   * The permissions of the role
   */
  public permissions: Readonly<Permissions>;

  /**
   * The position of the role in the role manager
   */
  public readonly position: number;

  /**
   * The raw position of the role from the API
   */
  public rawPosition: number;

  /**
   * The tags this role has
   */
  public tags: RoleTagData | null;

  /**
   * Compares this role's position to another role's.
   * @param role Role to compare to this one
   * @returns Negative number if this role's position is lower (other role's is higher),
   * positive number if this one is higher (other's is lower), 0 if equal
   */
  public comparePositionTo(role: RoleResolvable): number;

  /**
   * The icon hash of the role
   */
  public icon: string | null;

  /**
   * The unicode emoji for the role
   */
  public unicodeEmoji: string | null;

  /**
   * Deletes the role.
   * @param reason Reason for deleting this role
   * @example
   * // Delete a role
   * role.delete('The role needed to go')
   *   .then(deleted => console.log(`Deleted role ${deleted.name}`))
   *   .catch(console.error);
   */
  public delete(reason?: string): Promise<Role>;

  /**
   * Edits the role.
   * @param data The new data for the role
   * @param reason Reason for editing this role
   * @example
   * // Edit a role
   * role.edit({ name: 'new role' })
   *   .then(updated => console.log(`Edited role name to ${updated.name}`))
   *   .catch(console.error);
   */
  public edit(data: RoleData, reason?: string): Promise<Role>;

  /**
   * Whether this role equals another role. It compares all properties, so for most operations
   * it is advisable to just compare `role.id === role2.id` as it is much faster and is often
   * what most users need.
   * @param role Role to compare with
   */
  public equals(role: Role): boolean;

  /**
   * A link to the role's icon
   * @param options Options for the image URL
   */
  public iconURL(options?: StaticImageURLOptions): string | null;

  /**
   * Returns `channel.permissionsFor(role)`. Returns permissions for a role in a guild channel,
   * taking into account permission overwrites.
   * @param channel The guild channel to use as context
   * @param checkAdmin Whether having `ADMINISTRATOR` will return all permissions
   */
  public permissionsIn(channel: NonThreadGuildBasedChannel | Snowflake, checkAdmin?: boolean): Readonly<Permissions>;

  /**
   * Sets a new color for the role.
   * @param color The color of the role
   * @param reason Reason for changing the role's color
   * @example
   * // Set the color of a role
   * role.setColor('#FF0000')
   *   .then(updated => console.log(`Set color of role to ${updated.color}`))
   *   .catch(console.error);
   */
  public setColor(color: ColorResolvable, reason?: string): Promise<Role>;

  /**
   * Sets whether or not the role should be hoisted.
   * @param hoist Whether or not to hoist the role
   * @param reason Reason for setting whether or not the role should be hoisted
   * @example
   * // Set the hoist of the role
   * role.setHoist(true)
   *   .then(updated => console.log(`Role hoisted: ${updated.hoist}`))
   *   .catch(console.error);
   */
  public setHoist(hoist?: boolean, reason?: string): Promise<Role>;

  /**
   * Sets whether this role is mentionable.
   * @param mentionable Whether this role should be mentionable
   * @param reason Reason for setting whether or not this role should be mentionable
   * @example
   * // Make the role mentionable
   * role.setMentionable(true)
   *   .then(updated => console.log(`Role updated ${updated.name}`))
   *   .catch(console.error);
   */
  public setMentionable(mentionable?: boolean, reason?: string): Promise<Role>;

  /**
   * Sets a new name for the role.
   * @param name The new name of the role
   * @param reason Reason for changing the role's name
   * @example
   * // Set the name of the role
   * role.setName('new role')
   *   .then(updated => console.log(`Updated role name to ${updated.name}`))
   *   .catch(console.error);
   */
  public setName(name: string, reason?: string): Promise<Role>;

  /**
   * Sets the permissions of the role.
   * @param permissions The permissions of the role
   * @param reason Reason for changing the role's permissions
   * @example
   * // Set the permissions of the role
   * role.setPermissions([Permissions.FLAGS.KICK_MEMBERS, Permissions.FLAGS.BAN_MEMBERS])
   *   .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
   *   .catch(console.error);
   * @example
   * // Remove all permissions from a role
   * role.setPermissions(0n)
   *   .then(updated => console.log(`Updated permissions to ${updated.permissions.bitfield}`))
   *   .catch(console.error);
   */
  public setPermissions(permissions: PermissionResolvable, reason?: string): Promise<Role>;

  /**
   * Sets a new icon for the role.
   * @param icon The icon for the role
   * <warn>The `EmojiResolvable` should belong to the same guild as the role.
   * If not, pass the emoji's URL directly</warn>
   * @param reason Reason for changing the role's icon
   */
  public setIcon(icon: BufferResolvable | Base64Resolvable | EmojiResolvable | null, reason?: string): Promise<Role>;

  /**
   * Sets the new position of the role.
   * @param position The new position for the role
   * @param options Options for setting the position
   * @example
   * // Set the position of the role
   * role.setPosition(1)
   *   .then(updated => console.log(`Role position: ${updated.position}`))
   *   .catch(console.error);
   */
  public setPosition(position: number, options?: SetRolePositionOptions): Promise<Role>;

  /**
   * Sets a new unicode emoji for the role.
   * @param unicodeEmoji The new unicode emoji for the role
   * @param reason Reason for changing the role's unicode emoji
   * @example
   * // Set a new unicode emoji for the role
   * role.setUnicodeEmoji('🤖')
   *   .then(updated => console.log(`Set unicode emoji for the role to ${updated.unicodeEmoji}`))
   *   .catch(console.error);
   */
  public setUnicodeEmoji(unicodeEmoji: string | null, reason?: string): Promise<Role>;

  /**
   * Transforms the role to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the role's mention instead of the Role object.
   * @example
   * // Logs: Role: <@&123456789012345678>
   * console.log(`Role: ${role}`);
   */
  public toString(): RoleMention;

  /**
   * Compares the positions of two roles.
   * @param role1 First role to compare
   * @param role2 Second role to compare
   * @returns Negative number if the first role's position is lower (second role's is higher),
   * positive number if the first's is higher (second's is lower), 0 if equal
   * @deprecated Use {@link RoleManager.comparePositions} instead.
   */
  public static comparePositions(role1: Role, role2: Role): number;
}

/**
 * Represents a select menu interaction.
 */
export class SelectMenuInteraction<Cached extends CacheType = CacheType> extends MessageComponentInteraction<Cached> {
  public constructor(client: Client, data: RawMessageSelectMenuInteractionData);

  /**
   * The component which was interacted with
   */
  public readonly component: CacheTypeReducer<
    Cached,
    MessageSelectMenu,
    APISelectMenuComponent,
    MessageSelectMenu | APISelectMenuComponent,
    MessageSelectMenu | APISelectMenuComponent
  >;

  /**
   * The type of component which was interacted with
   */
  public componentType: 'SELECT_MENU';

  /**
   * The values selected, if the component which was interacted with was a select menu
   */
  public values: string[];

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is SelectMenuInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is SelectMenuInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is SelectMenuInteraction<'raw'>;
}

export interface ShardEventTypes {
  /**
   * Emitted upon the creation of the shard's child process/worker.
   * @param process Child process/worker that was created/exited.
   */
  spawn: [child: ChildProcess];

  /**
   * Emitted upon the shard's child process/worker exiting.
   * @param process Child process/worker that was created/exited.
   */
  death: [child: ChildProcess];

  /**
   * Emitted upon the shard's {@link ClientEvents.shardDisconnect} event.
   */
  disconnect: [];

  /**
   * Emitted upon the shard's {@link ClientEvents.shardReady} event.
   */
  ready: [];

  /**
   * Emitted upon the shard's {@link ClientEvents.shardReconnecting} event.
   */
  reconnection: [];

  error: [error: Error];

  /**
   * Emitted upon receiving a message from the child process/worker.
   * @param message Message that was received
   */
  message: [message: any];
}

/**
 * A self-contained shard created by the {@link ShardingManager}. Each one has a {@link ChildProcess} that contains
 * an instance of the bot and its {@link Client}. When its child process/worker exits for any reason, the shard will
 * spawn a new one to replace it as necessary.
 * @extends EventEmitter
 */
export class Shard extends EventEmitter {
  /**
   * @param manager Manager that is creating this shard
   * @param id The shard's id
   */
  public constructor(manager: ShardingManager, id: number);

  /**
   * Ongoing promises for calls to {@link Shard.eval}, mapped by the `script` they were called with
   */
  private _evals: Map<string, Promise<unknown>>;

  /**
   * Listener function for the {@link ChildProcess}' `exit` event
   */
  private _exitListener: (...args: any[]) => void;

  /**
   * Ongoing promises for calls to {@link Shard.fetchClientValue}, mapped by the `prop` they were called with
   */
  private _fetches: Map<string, Promise<unknown>>;

  /**
   * Handles the shard's process/worker exiting.
   * @param respawn Whether to spawn the shard again
   * @param timeout The amount in milliseconds to wait until the {@link Client}
   * has become ready (`-1` or `Infinity` for no wait)
   */
  private _handleExit(respawn?: boolean, timeout?: number): void;

  /**
   * Handles a message received from the child process/worker.
   * @param message Message received
   */
  private _handleMessage(message: unknown): void;

  /**
   * Arguments for the shard's process (only when {@link ShardingManager.mode} is `process`)
   */
  public args: string[];

  /**
   * Arguments for the shard's process executable (only when {@link ShardingManager.mode} is `process`)
   */
  public execArgv: string[];

  /**
   * Environment variables for the shard's process, or workerData for the shard's worker
   */
  public env: unknown;

  /**
   * The shard's id in the manager
   */
  public id: number;

  /**
   * Manager that created the shard
   */
  public manager: ShardingManager;

  /**
   * Process of the shard (if {@link ShardingManager.mode} is `process`)
   */
  public process: ChildProcess | null;

  /**
   * Whether the shard's {@link Client} is ready
   */
  public ready: boolean;

  /**
   * Worker of the shard (if {@link ShardingManager.mode} is `worker`)
   */
  public worker: Worker | null;

  /**
   * Evaluates a script or function on the shard, in the context of the {@link Client}.
   * @param script JavaScript to run on the shard
   * @param context The context for the eval
   * @returns Result of the script execution
   */
  public eval(script: string): Promise<unknown>;
  public eval<T>(fn: (client: Client) => T): Promise<T>;
  public eval<T, P>(fn: (client: Client, context: Serialized<P>) => T, context: P): Promise<T>;

  /**
   * Fetches a client property value of the shard.
   * @param prop Name of the client property to get, using periods for nesting
   * @example
   * shard.fetchClientValue('guilds.cache.size')
   *   .then(count => console.log(`${count} guilds in shard ${shard.id}`))
   *   .catch(console.error);
   */
  public fetchClientValue(prop: string): Promise<unknown>;

  /**
   * Immediately kills the shard's process/worker and does not restart it.
   */
  public kill(): void;

  /**
   * Kills and restarts the shard's process/worker.
   * @param options Options for respawning the shard
   */
  public respawn(options?: { delay?: number; timeout?: number }): Promise<ChildProcess>;

  /**
   * Sends a message to the shard's process/worker.
   * @param message Message to send to the shard
   */
  public send(message: unknown): Promise<Shard>;

  /**
   * Forks a child process or creates a worker thread for the shard.
   * <warn>You should not need to call this manually.</warn>
   * @param timeout The amount in milliseconds to wait until the {@link Client} has become ready
   * before resolving (`-1` or `Infinity` for no wait)
   */
  public spawn(timeout?: number): Promise<ChildProcess>;

  public on<K extends keyof ShardEventTypes>(
    event: K,
    listener: (...args: ShardEventTypes[K]) => Awaitable<void>,
  ): this;

  public once<K extends keyof ShardEventTypes>(
    event: K,
    listener: (...args: ShardEventTypes[K]) => Awaitable<void>,
  ): this;
}

/**
 * Helper class for sharded clients spawned as a child process/worker, such as from a {@link ShardingManager}.
 * Utilizes IPC to send and receive data to/from the master process and other shards.
 */
export class ShardClientUtil {
  /**
   * @param client Client of the current shard
   * @param mode Mode the shard was spawned with
   */
  public constructor(client: Client, mode: ShardingManagerMode);

  /**
   * Handles an IPC message.
   * @param message Message received
   */
  private _handleMessage(message: unknown): void;

  /**
   * Sends a message to the master process, emitting an error from the client upon failure.
   * @param type Type of response to send
   * @param message Message to send
   */
  private _respond(type: string, message: unknown): void;

  /**
   * Client for the shard
   */
  public client: Client;

  /**
   * Total number of shards
   */
  public readonly count: number;

  /**
   * Array of shard ids of this client
   */
  public readonly ids: number[];

  /**
   * Mode the shard was spawned with
   */
  public mode: ShardingManagerMode;

  /**
   * Message port for the master process (only when {@link ShardClientUtil.mode} is `worker`)
   */
  public parentPort: MessagePort | null;

  /**
   * Evaluates a script or function on all shards, or a given shard, in the context of the {@link Client}s.
   * @param script JavaScript to run on each shard
   * @param options The options for the broadcast
   * @returns Results of the script execution
   * @example
   * client.shard.broadcastEval(client => client.guilds.cache.size)
   *   .then(results => console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`))
   *   .catch(console.error);
   * @see {@link ShardingManager.broadcastEval}
   */
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>): Promise<Serialized<T>[]>;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>, options: { shard: number }): Promise<Serialized<T>>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P },
  ): Promise<Serialized<T>[]>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P; shard: number },
  ): Promise<Serialized<T>>;

  /**
   * Fetches a client property value of each shard, or a given shard.
   * @param prop Name of the client property to get, using periods for nesting
   * @param shard Shard to fetch property from, all if undefined
   * @example
   * client.shard.fetchClientValues('guilds.cache.size')
   *   .then(results => console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`))
   *   .catch(console.error);
   * @see {@link ShardingManager.fetchClientValues}
   */
  public fetchClientValues(prop: string): Promise<unknown[]>;
  public fetchClientValues(prop: string, shard: number): Promise<unknown>;

  /**
   * Requests a respawn of all shards.
   * @param options Options for respawning shards
   * @returns Resolves upon the message being sent
   * @see {@link ShardingManager.respawnAll}
   */
  public respawnAll(options?: MultipleShardRespawnOptions): Promise<void>;

  /**
   * Sends a message to the master process.
   * @param message Message to send
   * @emits Shard#message
   */
  public send(message: unknown): Promise<void>;

  /**
   * Creates/gets the singleton of this class.
   * @param client The client to use
   * @param mode Mode the shard was spawned with
   */
  public static singleton(client: Client, mode: ShardingManagerMode): ShardClientUtil;

  /**
   * Get the shard id for a given guild id.
   * @param guildId Snowflake guild id to get shard id for
   * @param shardCount Number of shards
   */
  public static shardIdForGuildId(guildId: Snowflake, shardCount: number): number;
}

/**
 * This is a utility class that makes multi-process sharding of a bot an easy and painless experience.
 * It works by spawning a self-contained {@link ChildProcess} or {@link Worker} for each individual shard, each
 * containing its own instance of your bot's {@link Client}. They all have a line of communication with the master
 * process, and there are several useful methods that utilise it in order to simplify tasks that are normally difficult
 * with sharding. It can spawn a specific number of shards or the amount that Discord suggests for the bot, and takes a
 * path to your main bot script to launch for each one.
 */
export class ShardingManager extends EventEmitter {
  /**
   * @param file Path to your shard script file
   * @param options Options for the sharding manager
   */
  public constructor(file: string, options?: ShardingManagerOptions);

  /**
   * Runs a method with given arguments on all shards, or a given shard.
   * @param method Method name to run on each shard
   * @param args Arguments to pass through to the method call
   * @param shard Shard to run on, all if undefined
   * @returns Results of the method execution
   */
  private _performOnShards(method: string, args: unknown[]): Promise<unknown[]>;
  private _performOnShards(method: string, args: unknown[], shard: number): Promise<unknown>;

  /**
   * Path to the shard script file
   */
  public file: string;

  /**
   * Whether shards should automatically respawn upon exiting
   */
  public respawn: boolean;

  /**
   * An array of arguments to pass to shards (only when {@link ShardingManager.mode} is `process`)
   */
  public shardArgs: string[];

  /**
   * A collection of shards that this manager has spawned
   */
  public shards: Collection<number, Shard>;

  /**
   * Token to use for obtaining the automatic shard count, and passing to shards
   */
  public token: string | null;

  /**
   * Amount of shards that all sharding managers spawn in total
   */
  public totalShards: number | 'auto';

  /**
   * List of shards this sharding manager spawns
   */
  public shardList: number[] | 'auto';

  /**
   * Sends a message to all shards.
   * @param message Message to be sent to the shards
   */
  public broadcast(message: unknown): Promise<Shard[]>;

  /**
   * Evaluates a script on all shards, or a given shard, in the context of the {@link Client}s.
   * @param script JavaScript to run on each shard
   * @param options The options for the broadcast
   * @returns Results of the script execution
   */
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>): Promise<Serialized<T>[]>;
  public broadcastEval<T>(fn: (client: Client) => Awaitable<T>, options: { shard: number }): Promise<Serialized<T>>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P },
  ): Promise<Serialized<T>[]>;
  public broadcastEval<T, P>(
    fn: (client: Client, context: Serialized<P>) => Awaitable<T>,
    options: { context: P; shard: number },
  ): Promise<Serialized<T>>;

  /**
   * Creates a single shard.
   * <warn>Using this method is usually not necessary if you use the spawn method.</warn>
   * @param id Id of the shard to create
   * <info>This is usually not necessary to manually specify.</info>
   * @returns Note that the created shard needs to be explicitly spawned using its spawn method.
   */
  public createShard(id: number): Shard;

  /**
   * Fetches a client property value of each shard, or a given shard.
   * @param prop Name of the client property to get, using periods for nesting
   * @param shard Shard to fetch property from, all if undefined
   * @example
   * manager.fetchClientValues('guilds.cache.size')
   *   .then(results => console.log(`${results.reduce((prev, val) => prev + val, 0)} total guilds`))
   *   .catch(console.error);
   */
  public fetchClientValues(prop: string): Promise<unknown[]>;
  public fetchClientValues(prop: string, shard: number): Promise<unknown>;

  /**
   * Kills all running shards and respawns them.
   * @param options Options for respawning shards
   */
  public respawnAll(options?: MultipleShardRespawnOptions): Promise<Collection<number, Shard>>;

  /**
   * Spawns multiple shards.
   * @param options Options for spawning shards
   */
  public spawn(options?: MultipleShardSpawnOptions): Promise<Collection<number, Shard>>;

  /**
   * Emitted upon creating a shard.
   * @param shard Shard that was created
   */
  public on(event: 'shardCreate', listener: (shard: Shard) => Awaitable<void>): this;

  /**
   * Emitted upon creating a shard.
   * @param shard Shard that was created
   */
  public once(event: 'shardCreate', listener: (shard: Shard) => Awaitable<void>): this;
}

export interface FetchRecommendedShardsOptions {
  /**
   * Number of guilds assigned per shard
   */
  guildsPerShard?: number;

  /**
   * The multiple the shard count should round up to. (16 for large bot sharding)
   */
  multipleOf?: number;
}

/**
 * A container for useful snowflake-related methods.
 */
export class SnowflakeUtil extends null {
  private constructor();

  /**
   * Deconstructs a Discord snowflake.
   * @param snowflake Snowflake to deconstruct
   */
  public static deconstruct(snowflake: Snowflake): DeconstructedSnowflake;

  /**
   * Generates a Discord snowflake.
   * <info>This hardcodes the worker's id as 1 and the process's id as 0.</info>
   * @param timestamp Timestamp or date of the snowflake to generate
   * @returns The generated snowflake
   */
  public static generate(timestamp?: number | Date): Snowflake;

  /**
   * Retrieves the timestamp field's value from a Discord snowflake.
   * @param snowflake Snowflake to get the timestamp value from
   */
  public static timestampFrom(snowflake: Snowflake): number;

  /**
   * Discord's epoch value (2015-01-01T00:00:00.000Z).
   */
  public static readonly EPOCH: number;
}

/**
 * Represents a guild stage channel on Discord.
 */
export class StageChannel extends BaseGuildVoiceChannel {
  /**
   * The topic of the stage channel
   */
  public topic: string | null;

  /**
   * The type of the channel
   */
  public type: 'GUILD_STAGE_VOICE';

  /**
   * The stage instance of this stage channel, if it exists
   */
  public readonly stageInstance: StageInstance | null;

  /**
   * Creates a stage instance associated with this stage channel.
   * @param options The options to create the stage instance
   */
  public createStageInstance(options: StageInstanceCreateOptions): Promise<StageInstance>;

  /**
   * Sets a new topic for the guild channel.
   * @param topic The new topic for the guild channel
   * @param reason Reason for changing the guild channel's topic
   * @example
   * // Set a new channel topic
   * channel.setTopic('needs more rate limiting')
   *   .then(newChannel => console.log(`Channel's new topic is ${newChannel.topic}`))
   *   .catch(console.error);
   */
  public setTopic(topic: string): Promise<StageChannel>;
}

/**
 * Represents a stage instance.
 */
export class StageInstance extends Base {
  public constructor(client: Client, data: RawStageInstanceData, channel: StageChannel);

  /**
   * The stage instance's id
   */
  public id: Snowflake;

  /**
   * Whether the stage instance has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The id of the guild associated with the stage channel
   */
  public guildId: Snowflake;

  /**
   * The id of the channel associated with the stage channel
   */
  public channelId: Snowflake;

  /**
   * The topic of the stage instance
   */
  public topic: string;

  /**
   * The privacy level of the stage instance
   */
  public privacyLevel: PrivacyLevel;

  /**
   * Whether or not stage discovery is disabled
   */
  public discoverableDisabled: boolean | null;

  /**
   * The stage channel associated with this stage instance
   */
  public readonly channel: StageChannel | null;

  /**
   * The guild this stage instance belongs to
   */
  public readonly guild: Guild | null;

  /**
   * Edits this stage instance.
   * @param options The options to edit the stage instance
   * @example
   * // Edit a stage instance
   * stageInstance.edit({ topic: 'new topic' })
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error)
   */
  public edit(options: StageInstanceEditOptions): Promise<StageInstance>;

  /**
   * Deletes this stage instance.
   * @example
   * // Delete a stage instance
   * stageInstance.delete()
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error);
   */
  public delete(): Promise<StageInstance>;

  /**
   * Sets the topic of this stage instance.
   * @param topic The topic for the stage instance
   * @example
   * // Set topic of a stage instance
   * stageInstance.setTopic('new topic')
   *  .then(stageInstance => console.log(`Set the topic to: ${stageInstance.topic}`))
   *  .catch(console.error);
   */
  public setTopic(topic: string): Promise<StageInstance>;

  /**
   * The timestamp this stage instances was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The time this stage instance was created at
   */
  public readonly createdAt: Date;
}

/**
 * Allows for the extension of built-in Discord.js structures that are instantiated by {@link BaseManager Managers}.
 */
export class Structures extends null {
  private constructor();

  /**
   * Retrieves a structure class.
   * @param structure Name of the structure to retrieve
   */
  public static get<K extends keyof Extendable>(structure: K): Extendable[K];
  public static get(structure: string): (...args: any[]) => void;

  /**
   * Extends a structure.
   * <warn> Make sure to extend all structures before instantiating your client.
   * Extending after doing so may not work as expected. </warn>
   * @param structure Name of the structure class to extend
   * @param extender Function that takes the base class to extend as its only parameter and returns the
   * extended class/prototype
   * @returns Extended class/prototype returned from the extender
   * const { Structures } = require('discord.js');
   *
   * Structures.extend('Guild', Guild => {
   *   class CoolGuild extends Guild {
   *     constructor(client, data) {
   *       super(client, data);
   *       this.cool = true;
   *     }
   *   }
   *
   *   return CoolGuild;
   * });
   */
  public static extend<K extends keyof Extendable, T extends Extendable[K]>(
    structure: K,
    extender: (baseClass: Extendable[K]) => T,
  ): T;
  public static extend<T extends (...args: any[]) => void>(
    structure: string,
    extender: (baseClass: typeof Function) => T,
  ): T;
}

/**
 * Represents a Sticker.
 */
export class Sticker extends Base {
  /**
   * @param client The instantiating client
   * @param data The data for the sticker
   */
  public constructor(client: Client, data: RawStickerData);

  /**
   * Whether or not the sticker has been deleted
   * @deprecated This will be removed in the next major version, see https://github.com/discordjs/discord.js/issues/7091
   */
  public deleted: boolean;

  /**
   * The timestamp the sticker was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The time the sticker was created at
   */
  public readonly createdAt: Date;

  /**
   * Whether or not the guild sticker is available
   */
  public available: boolean | null;

  /**
   * The description of the sticker
   */
  public description: string | null;

  /**
   * The format of the sticker
   */
  public format: StickerFormatType;

  /**
   * The guild that owns this sticker
   */
  public readonly guild: Guild | null;

  /**
   * The id of the guild that owns this sticker
   */
  public guildId: Snowflake | null;

  /**
   * The sticker's id
   */
  public id: Snowflake;

  /**
   * The name of the sticker
   */
  public name: string;

  /**
   * The id of the pack the sticker is from, for standard stickers
   */
  public packId: Snowflake | null;

  /**
   * Whether this sticker is partial
   */
  public readonly partial: boolean;

  /**
   * The standard sticker's sort order within its pack
   */
  public sortValue: number | null;

  /**
   * An array of tags for the sticker
   */
  public tags: string[] | null;

  /**
   * The type of the sticker
   */
  public type: StickerType | null;

  /**
   * The user that uploaded the guild sticker
   */
  public user: User | null;

  /**
   * A link to the sticker
   * <info>If the sticker's format is LOTTIE, it returns the URL of the Lottie JSON file.</info>
   */
  public readonly url: string;

  /**
   * Fetches this sticker.
   */
  public fetch(): Promise<Sticker>;

  /**
   * Fetches the pack this sticker is part of from Discord, if this is a Nitro sticker.
   */
  public fetchPack(): Promise<StickerPack | null>;

  /**
   * Fetches the user who uploaded this sticker, if this is a guild sticker.
   */
  public fetchUser(): Promise<User | null>;

  /**
   * Edits the sticker.
   * @param data The new data for the sticker
   * @param reason Reason for editing this sticker
   * @example
   * // Update the name of a sticker
   * sticker.edit({ name: 'new name' })
   *   .then(s => console.log(`Updated the name of the sticker to ${s.name}`))
   *   .catch(console.error);
   */
  public edit(data?: GuildStickerEditData, reason?: string): Promise<Sticker>;

  /**
   * Deletes the sticker.
   * @param reason Reason for deleting this sticker
   * @example
   * // Delete a message
   * sticker.delete()
   *   .then(s => console.log(`Deleted sticker ${s.name}`))
   *   .catch(console.error);
   */
  public delete(reason?: string): Promise<Sticker>;

  /**
   * Whether this sticker is the same as another one.
   * @param other The sticker to compare it to
   */
  public equals(other: Sticker | unknown): boolean;
}

/**
 * Represents a pack of standard stickers.
 */
export class StickerPack extends Base {
  /**
   * @param client The instantiating client
   * @param pack The data for the sticker pack
   */
  public constructor(client: Client, data: RawStickerPackData);

  /**
   * The timestamp the sticker was created at
   */
  public readonly createdTimestamp: number;

  /**
   * The time the sticker was created at
   */
  public readonly createdAt: Date;

  /**
   * The id of the sticker pack's banner image
   */
  public bannerId: Snowflake | null;

  /**
   * The sticker which is shown as the pack's icon
   */
  public readonly coverSticker: Sticker | null;

  /**
   * The id of a sticker in the pack which is shown as the pack's icon
   */
  public coverStickerId: Snowflake | null;

  /**
   * The description of the sticker pack
   */
  public description: string;

  /**
   * The Sticker pack's id
   */
  public id: Snowflake;

  /**
   * The name of the sticker pack
   */
  public name: string;

  /**
   * The id of the pack's SKU
   */
  public skuId: Snowflake;

  /**
   * The stickers in the pack
   */
  public stickers: Collection<Snowflake, Sticker>;

  /**
   * The URL to this sticker pack's banner.
   * @param options Options for the Image URL
   */
  public bannerURL(options?: StaticImageURLOptions): string | null;
}

/**
 * Represents a guild store channel on Discord.
 * @deprecated Store channels are deprecated and will be removed from Discord in March 2022. See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/4414590563479) for more information
 */
export class StoreChannel extends GuildChannel {
  /**
   * @param guild The guild the store channel is part of
   * @param data The data for the store channel
   * @param client A safety parameter for the client that instantiated this
   */
  public constructor(guild: Guild, data?: RawGuildChannelData, client?: Client);

  /**
   * Creates an invite to this guild channel.
   * @param options The options for creating the invite
   * @example
   * // Create an invite to a channel
   * channel.createInvite()
   *   .then(invite => console.log(`Created an invite with a code of ${invite.code}`))
   *   .catch(console.error);
   */
  public createInvite(options?: CreateInviteOptions): Promise<Invite>;

  /**
   * Fetches a collection of invites to this guild channel.
   * Resolves with a collection mapping invites by their codes.
   * @param cache Whether or not to cache the fetched invites
   */
  public fetchInvites(cache?: boolean): Promise<Collection<string, Invite>>;

  /**
   * Clones this channel.
   * @param options The options for cloning this channel
   * @deprecated Store channels are deprecated and will be removed from Discord in March 2022. See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/4414590563479) for more information
   */
  public clone(options?: GuildChannelCloneOptions): Promise<this>;

  /**
   * If the guild considers this channel NSFW
   */
  public nsfw: boolean;

  /**
   * The type of the channel
   */
  public type: 'GUILD_STORE';
}

/**
 * A container for all cache sweeping intervals and their associated sweep methods.
 */
export class Sweepers {
  public constructor(client: Client, options: SweeperOptions);

  /**
   * The client that instantiated this
   */
  public readonly client: Client;

  /**
   * A record of interval timeout that is used to sweep the indicated items, or null if not being swept
   */
  public intervals: Record<SweeperKey, NodeJS.Timeout | null>;

  /**
   * The options the sweepers were instantiated with
   */
  public options: SweeperOptions;

  /**
   * Sweeps all guild and global application commands and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which commands will be removed from the caches.
   * @returns Amount of commands that were removed from the caches
   */
  public sweepApplicationCommands(
    filter: CollectionSweepFilter<
      SweeperDefinitions['applicationCommands'][0],
      SweeperDefinitions['applicationCommands'][1]
    >,
  ): number;

  /**
   * Sweeps all guild bans and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which bans will be removed from the caches.
   * @returns Amount of bans that were removed from the caches
   */
  public sweepBans(filter: CollectionSweepFilter<SweeperDefinitions['bans'][0], SweeperDefinitions['bans'][1]>): number;

  /**
   * Sweeps all guild emojis and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which emojis will be removed from the caches.
   * @returns Amount of emojis that were removed from the caches
   */
  public sweepEmojis(
    filter: CollectionSweepFilter<SweeperDefinitions['emojis'][0], SweeperDefinitions['emojis'][1]>,
  ): number;

  /**
   * Sweeps all guild invites and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which invites will be removed from the caches.
   * @returns Amount of invites that were removed from the caches
   */
  public sweepInvites(
    filter: CollectionSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>,
  ): number;

  /**
   * Sweeps all guild members and removes the ones which are indicated by the filter.
   * <info>It is highly recommended to keep the client guild member cached</info>
   * @param filter The function used to determine which guild members will be removed from the caches.
   * @returns Amount of guild members that were removed from the caches
   */
  public sweepGuildMembers(
    filter: CollectionSweepFilter<SweeperDefinitions['guildMembers'][0], SweeperDefinitions['guildMembers'][1]>,
  ): number;

  /**
   * Sweeps all text-based channels' messages and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which messages will be removed from the caches.
   * @returns Amount of messages that were removed from the caches
   * @example
   * // Remove all messages older than 1800 seconds from the messages cache
   * const amount = sweepers.sweepMessages(
   *   Sweepers.filterByLifetime({
   *     lifetime: 1800,
   *     getComparisonTimestamp: m => m.editedTimestamp ?? m.createdTimestamp,
   *   })(),
   * );
   * console.log(`Successfully removed ${amount} messages from the cache.`);
   */
  public sweepMessages(
    filter: CollectionSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>,
  ): number;

  /**
   * Sweeps all presences and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which presences will be removed from the caches.
   * @returns Amount of presences that were removed from the caches
   */
  public sweepPresences(
    filter: CollectionSweepFilter<SweeperDefinitions['presences'][0], SweeperDefinitions['presences'][1]>,
  ): number;

  /**
   * Sweeps all message reactions and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which reactions will be removed from the caches.
   * @returns Amount of reactions that were removed from the caches
   */
  public sweepReactions(
    filter: CollectionSweepFilter<SweeperDefinitions['reactions'][0], SweeperDefinitions['reactions'][1]>,
  ): number;

  /**
   * Sweeps all guild stage instances and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which stage instances will be removed from the caches.
   * @returns Amount of stage instances that were removed from the caches
   */
  public sweepStageInstances(
    filter: CollectionSweepFilter<SweeperDefinitions['stageInstances'][0], SweeperDefinitions['stageInstances'][1]>,
  ): number;

  public sweepStickers(
    filter: CollectionSweepFilter<SweeperDefinitions['stickers'][0], SweeperDefinitions['stickers'][1]>,
  ): number;

  /**
   * Sweeps all thread members and removes the ones which are indicated by the filter.
   * <info>It is highly recommended to keep the client thread member cached</info>
   * @param filter The function used to determine which thread members will be removed from the caches.
   * @returns Amount of thread members that were removed from the caches
   */
  public sweepThreadMembers(
    filter: CollectionSweepFilter<SweeperDefinitions['threadMembers'][0], SweeperDefinitions['threadMembers'][1]>,
  ): number;

  /**
   * Sweeps all threads and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which threads will be removed from the caches.
   * @returns Amount of threads that were removed from the caches
   * @example
   * // Remove all threads archived greater than 1 day ago from all the channel caches
   * const amount = sweepers.sweepThreads(
   *   Sweepers.filterByLifetime({
   *     getComparisonTimestamp: t => t.archivedTimestamp,
   *     excludeFromSweep: t => !t.archived,
   *   })(),
   * );
   * console.log(`Successfully removed ${amount} threads from the cache.`);
   */
  public sweepThreads(
    filter: CollectionSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>,
  ): number;

  /**
   * Sweeps all users and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which users will be removed from the caches.
   * @returns Amount of users that were removed from the caches
   */
  public sweepUsers(
    filter: CollectionSweepFilter<SweeperDefinitions['users'][0], SweeperDefinitions['users'][1]>,
  ): number;

  /**
   * Sweeps all guild voice states and removes the ones which are indicated by the filter.
   * @param filter The function used to determine which voice states will be removed from the caches.
   * @returns Amount of voice states that were removed from the caches
   */
  public sweepVoiceStates(
    filter: CollectionSweepFilter<SweeperDefinitions['voiceStates'][0], SweeperDefinitions['voiceStates'][1]>,
  ): number;

  /**
   * Creates a sweep filter that sweeps archived threads
   * @param lifetime How long a thread has to be archived to be valid for sweeping
   */
  public static archivedThreadSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['threads'][0], SweeperDefinitions['threads'][1]>;

  /**
   * Creates a sweep filter that sweeps expired invites
   * @param lifetime How long ago an invite has to have expired to be valid for sweeping
   */
  public static expiredInviteSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['invites'][0], SweeperDefinitions['invites'][1]>;

  /**
   * Create a sweepFilter function that uses a lifetime to determine sweepability.
   * @param options The options used to generate the filter function
   */
  public static filterByLifetime<K, V>(options?: LifetimeFilterOptions<K, V>): GlobalSweepFilter<K, V>;

  /**
   * Creates a sweep filter that sweeps outdated messages (edits taken into account)
   * @param lifetime How long ago a message has to have been sent or edited to be valid for sweeping
   */
  public static outdatedMessageSweepFilter(
    lifetime?: number,
  ): GlobalSweepFilter<SweeperDefinitions['messages'][0], SweeperDefinitions['messages'][1]>;
}

/**
 * Data structure that makes it easy to interact with a {@link Guild.systemChannelFlags} bitfield.
 * <info>Note that all event message types are enabled by default,
 * and by setting their corresponding flags you are disabling them</info>
 */
export class SystemChannelFlags extends BitField<SystemChannelFlagsString> {
  /**
   * Numeric system channel flags.
   * @see {@link [System Channel Flags](https://discord.com/developers/docs/resources/guild#guild-object-system-channel-flags)}
   */
  public static FLAGS: Record<SystemChannelFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<SystemChannelFlagsString, number>): number;
}

/**
 * Represents a Client OAuth2 Application Team.
 */
export class Team extends Base {
  public constructor(client: Client, data: RawTeamData);

  /**
   * The Team's id
   */
  public id: Snowflake;

  /**
   * The name of the Team
   */
  public name: string;

  /**
   * The Team's icon hash
   */
  public icon: string | null;

  /**
   * The Team's owner id
   */
  public ownerId: Snowflake | null;

  /**
   * The Team's members
   */
  public members: Collection<Snowflake, TeamMember>;

  /**
   * The owner of this team
   */
  public readonly owner: TeamMember | null;

  /**
   * The time the team was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the team was created at
   */
  public readonly createdTimestamp: number;

  /**
   * A link to the team's icon.
   * @param options Options for the Image URL
   */
  public iconURL(options?: StaticImageURLOptions): string | null;

  /**
   * Transforms the team to a plain object.
   */
  public toJSON(): unknown;

  /**
   * When concatenated with a string, this automatically returns the Team's name instead of the
   * Team object.
   * @example
   * // Logs: Team name: My Team
   * console.log(`Team name: ${team}`);
   */
  public toString(): string;
}

/**
 * Represents a Client OAuth2 Application Team Member.
 */
export class TeamMember extends Base {
  public constructor(team: Team, data: RawTeamMemberData);

  /**
   * The Team this member is part of
   */
  public team: Team;

  /**
   * The Team Member's id
   */
  public readonly id: Snowflake;

  /**
   * The permissions this Team Member has with regard to the team
   */
  public permissions: string[];

  /**
   * The permissions this Team Member has with regard to the team
   */
  public membershipState: MembershipState;

  /**
   * The user for this Team Member
   */
  public user: User;

  /**
   * When concatenated with a string, this automatically returns the team member's mention instead of the
   * TeamMember object.
   * @example
   * // Logs: Team Member's mention: <@123456789012345678>
   * console.log(`Team Member's mention: ${teamMember}`);
   */
  public toString(): UserMention;
}

/**
 * Represents a guild text channel on Discord.
 */
export class TextChannel extends BaseGuildTextChannel {
  /**
   * The rate limit per user (slowmode) for this channel in seconds
   */
  public rateLimitPerUser: number;

  /**
   * A manager of the threads belonging to this channel
   */
  public threads: ThreadManager<AllowedThreadTypeForTextChannel>;

  /**
   * The type of the channel
   */
  public type: 'GUILD_TEXT';

  /**
   * Sets the rate limit per user (slowmode) for this channel.
   * @param rateLimitPerUser The new rate limit in seconds
   * @param reason Reason for changing the channel's rate limit
   */
  public setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<TextChannel>;
}

/**
 * Represents a thread channel on Discord.
 */
export class ThreadChannel extends TextBasedChannelMixin(Channel) {
  /**
   * @param guild The guild the thread channel is part of
   * @param data The data for the thread channel
   * @param client A safety parameter for the client that instantiated this
   * @param fromInteraction Whether the data was from an interaction (partial)
   */
  public constructor(guild: Guild, data?: RawThreadChannelData, client?: Client, fromInteraction?: boolean);

  /**
   * Whether the thread is archived
   */
  public archived: boolean | null;

  /**
   * The time at which this thread's archive status was last changed
   * <info>If the thread was never archived or unarchived, this is the time at which the thread was created</info>
   */
  public readonly archivedAt: Date | null;

  /**
   * The timestamp when the thread's archive status was last changed
   * <info>If the thread was never archived or unarchived, this is the timestamp at which the thread was
   * created</info>
   */
  public archiveTimestamp: number | null;

  /**
   * The amount of time (in minutes) after which the thread will automatically archive in case of no recent activity
   */
  public autoArchiveDuration: ThreadAutoArchiveDuration | null;

  /**
   * Whether the thread is editable by the client user (name, archived, autoArchiveDuration)
   */
  public readonly editable: boolean;

  /**
   * The guild the thread is in
   */
  public guild: Guild;

  /**
   * The id of the guild the channel is in
   */
  public guildId: Snowflake;

  /**
   * A collection of associated guild member objects of this thread's members
   */
  public readonly guildMembers: Collection<Snowflake, GuildMember>;

  /**
   * Whether members without `MANAGE_THREADS` can invite other members without `MANAGE_THREADS`
   * <info>Always `null` in public threads</info>
   */
  public invitable: boolean | null;

  /**
   * Whether the thread is joinable by the client user
   */
  public readonly joinable: boolean;

  /**
   * Whether the client user is a member of the thread.
   */
  public readonly joined: boolean;

  /**
   * Whether the thread is locked
   */
  public locked: boolean | null;

  /**
   * Whether the thread is manageable by the client user, for deleting or editing rateLimitPerUser or locked.
   */
  public readonly manageable: boolean;

  /**
   * Whether the thread is viewable by the client user
   */
  public readonly viewable: boolean;

  /**
   * Whether the client user can send messages in this thread
   */
  public readonly sendable: boolean;

  /**
   * The approximate count of users in this thread
   * <info>This stops counting at 50. If you need an approximate value higher than that, use
   * `ThreadChannel.members.cache.size`</info>
   */
  public memberCount: number | null;

  /**
   * The approximate count of messages in this thread
   * <info>This stops counting at 50. If you need an approximate value higher than that, use
   * `ThreadChannel#messages.cache.size`</info>
   */
  public messageCount: number | null;

  /**
   * A manager of the messages sent to this thread
   */
  public messages: MessageManager;

  /**
   * A manager of the members that are part of this thread
   */
  public members: ThreadMemberManager;

  /**
   * The name of the thread
   */
  public name: string;

  /**
   * The id of the member who created this thread
   */
  public ownerId: Snowflake | null;

  /**
   * The parent channel of this thread
   */
  public readonly parent: TextChannel | NewsChannel | null;

  /**
   * The id of the parent channel of this thread
   */
  public parentId: Snowflake | null;

  /**
   * The rate limit per user (slowmode) for this thread in seconds
   */
  public rateLimitPerUser: number | null;

  /**
   * The type of the channel
   */
  public type: ThreadChannelTypes;

  /**
   * Whether the thread is unarchivable by the client user
   */
  public readonly unarchivable: boolean;

  /**
   * Deletes this thread.
   * @param reason Reason for deleting this thread
   * @example
   * // Delete the thread
   * thread.delete('cleaning out old threads')
   *   .then(deletedThread => console.log(deletedThread))
   *   .catch(console.error);
   */
  public delete(reason?: string): Promise<this>;

  /**
   * Edits this thread.
   * @param data The new data for this thread
   * @param reason Reason for editing this thread
   * @example
   * // Edit a thread
   * thread.edit({ name: 'new-thread' })
   *   .then(editedThread => console.log(editedThread))
   *   .catch(console.error);
   */
  public edit(data: ThreadEditData, reason?: string): Promise<ThreadChannel>;

  /**
   * Makes the client user join the thread.
   */
  public join(): Promise<ThreadChannel>;

  /**
   * Makes the client user leave the thread.
   */
  public leave(): Promise<ThreadChannel>;

  /**
   * Gets the overall set of permissions for a member or role in this thread's parent channel, taking overwrites into
   * account.
   * @param memberOrRole The member or role to obtain the overall permissions for
   * @param checkAdmin Whether having `ADMINISTRATOR` will return all permissions
   */
  public permissionsFor(memberOrRole: GuildMember | Role, checkAdmin?: boolean): Readonly<Permissions>;
  public permissionsFor(
    memberOrRole: GuildMemberResolvable | RoleResolvable,
    checkAdmin?: boolean,
  ): Readonly<Permissions> | null;

  /**
   * Fetches the owner of this thread. If the thread member object isn't needed,
   * use {@link ThreadChannel.ownerId} instead.
   * @param options The options for fetching the member
   */
  public fetchOwner(options?: BaseFetchOptions): Promise<ThreadMember | null>;

  /**
   * Fetches the message that started this thread, if any.
   * <info>This only works when the thread started from a message in the parent channel, otherwise the promise will
   * reject. If you just need the id of that message, use {@link ThreadChannel.id} instead.</info>
   * @param options Additional options for this fetch
   */
  public fetchStarterMessage(options?: BaseFetchOptions): Promise<Message>;

  /**
   * Sets whether the thread is archived.
   * @param archived Whether the thread is archived
   * @param reason Reason for archiving or unarchiving
   * @example
   * // Archive the thread
   * thread.setArchived(true)
   *   .then(newThread => console.log(`Thread is now ${newThread.archived ? 'archived' : 'active'}`))
   *   .catch(console.error);
   */
  public setArchived(archived?: boolean, reason?: string): Promise<ThreadChannel>;

  /**
   * Sets the duration after which the thread will automatically archive in case of no recent activity.
   * @param autoArchiveDuration The amount of time (in minutes) after which the thread
   * should automatically archive in case of no recent activity
   * @param reason Reason for changing the auto archive duration
   * @example
   * // Set the thread's auto archive time to 1 hour
   * thread.setAutoArchiveDuration(60)
   *   .then(newThread => {
   *     console.log(`Thread will now archive after ${newThread.autoArchiveDuration} minutes of inactivity`);
   *    });
   *   .catch(console.error);
   */
  public setAutoArchiveDuration(
    autoArchiveDuration: ThreadAutoArchiveDuration,
    reason?: string,
  ): Promise<ThreadChannel>;

  /**
   * Sets whether members without the `MANAGE_THREADS` permission can invite other members without the
   * `MANAGE_THREADS` permission to this thread.
   * @param invitable Whether non-moderators can invite non-moderators to this thread
   * @param reason Reason for changing invite
   */
  public setInvitable(invitable?: boolean, reason?: string): Promise<ThreadChannel>;

  /**
   * Sets whether the thread can be **unarchived** by anyone with `SEND_MESSAGES` permission.
   * When a thread is locked only members with `MANAGE_THREADS` can unarchive it.
   * @param locked Whether the thread is locked
   * @param reason Reason for locking or unlocking the thread
   * @example
   * // Set the thread to locked
   * thread.setLocked(true)
   *   .then(newThread => console.log(`Thread is now ${newThread.locked ? 'locked' : 'unlocked'}`))
   *   .catch(console.error);
   */
  public setLocked(locked?: boolean, reason?: string): Promise<ThreadChannel>;

  /**
   * Sets a new name for this thread.
   * @param name The new name for the thread
   * @param reason Reason for changing the thread's name
   * @example
   * // Change the thread's name
   * thread.setName('not_general')
   *   .then(newThread => console.log(`Thread's new name is ${newThread.name}`))
   *   .catch(console.error);
   */
  public setName(name: string, reason?: string): Promise<ThreadChannel>;

  /**
   * Sets the rate limit per user (slowmode) for this thread.
   * @param rateLimitPerUser The new rate limit in seconds
   * @param reason Reason for changing the thread's rate limit
   */
  public setRateLimitPerUser(rateLimitPerUser: number, reason?: string): Promise<ThreadChannel>;
}

/**
 * Represents a Member for a Thread.
 */
export class ThreadMember extends Base {
  /**
   * @param thread The thread that this member is associated with
   * @param data The data for the thread member
   */
  public constructor(thread: ThreadChannel, data?: RawThreadMemberData);

  /**
   * The flags for this thread member
   */
  public flags: ThreadMemberFlags;

  /**
   * The guild member associated with this thread member
   */
  public readonly guildMember: GuildMember | null;

  /**
   * The id of the thread member
   */
  public id: Snowflake;

  /**
   * The last time this member joined the thread
   */
  public readonly joinedAt: Date | null;

  /**
   * The timestamp the member last joined the thread at
   */
  public joinedTimestamp: number | null;

  /**
   * Whether the client user can manage this thread member
   */
  public readonly manageable: boolean;

  /**
   * The thread that this member is a part of
   */
  public thread: ThreadChannel;

  /**
   * The user associated with this thread member
   */
  public readonly user: User | null;

  /**
   * Removes this member from the thread.
   * @param reason Reason for removing the member
   */
  public remove(reason?: string): Promise<ThreadMember>;
}

/**
 * Data structure that makes it easy to interact with a {@link ThreadMember.flags} bitfield.
 */
export class ThreadMemberFlags extends BitField<ThreadMemberFlagsString> {
  /**
   * Numeric thread member flags. There are currently no bitflags relevant to bots for this.
   */
  public static FLAGS: Record<ThreadMemberFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<ThreadMemberFlagsString, number>): number;
}

/**
 * Represents a typing state for a user in a channel.
 */
export class Typing extends Base {
  /**
   * @param channel The channel this typing came from
   * @param user The user that started typing
   * @param data The raw data received
   */
  public constructor(channel: TextBasedChannel, user: PartialUser, data?: RawTypingData);

  /**
   * The channel the status is from
   */
  public channel: TextBasedChannel;

  /**
   * The user who is typing
   */
  public user: PartialUser;

  /**
   * The UNIX timestamp in milliseconds the user started typing at
   */
  public startedTimestamp: number;

  /**
   * The time the user started typing at
   */
  public readonly startedAt: Date;

  /**
   * The guild the status is from
   */
  public readonly guild: Guild | null;

  /**
   * The member who is typing
   */
  public readonly member: GuildMember | null;

  /**
   * Indicates whether the status is received from a guild.
   */
  public inGuild(): this is this & {
    channel: TextChannel | NewsChannel | ThreadChannel;
    readonly guild: Guild;
  };
}

/**
 * Represents a user on Discord.
 */
export class User extends PartialTextBasedChannel(Base) {
  /**
   * @param client The instantiating client
   * @param data The data for the user
   */
  public constructor(client: Client, data: RawUserData);

  /**
   * Compares the user with an API user object
   * @param user The API user object to compare
   */
  private _equals(user: APIUser): boolean;

  /**
   * The base 10 accent color of the user's banner
   * <info>The user must be force fetched for this property to be present or be updated</info>
   */
  public accentColor: number | null | undefined;

  /**
   * The user avatar's hash
   */
  public avatar: string | null;

  /**
   * The user banner's hash
   * <info>The user must be force fetched for this property to be present or be updated</info>
   */
  public banner: string | null | undefined;

  /**
   * Whether or not the user is a bot
   */
  public bot: boolean;

  /**
   * The time the user was created at
   */
  public readonly createdAt: Date;

  /**
   * The timestamp the user was created at
   */
  public readonly createdTimestamp: number;

  /**
   * A discriminator based on username for the user
   */
  public discriminator: string;

  /**
   * A link to the user's default avatar
   */
  public readonly defaultAvatarURL: string;

  /**
   * The DM between the client's user and this user
   */
  public readonly dmChannel: DMChannel | null;

  /**
   * The flags for this user
   */
  public flags: Readonly<UserFlags> | null;

  /**
   * The hexadecimal version of the user accent color, with a leading hash
   * <info>The user must be force fetched for this property to be present</info>
   */
  public readonly hexAccentColor: HexColorString | null | undefined;

  /**
   * The user's id
   */
  public id: Snowflake;

  /**
   * Whether this User is a partial
   */
  public readonly partial: false;

  /**
   * Whether the user is an Official Discord System user (part of the urgent message system)
   */
  public system: boolean;

  /**
   * The Discord "tag" (e.g. `hydrabolt#0001`) for this user
   */
  public readonly tag: string;

  /**
   * The username of the user
   */
  public username: string;

  /**
   * A link to the user's avatar.
   * @param options Options for the Image URL
   */
  public avatarURL(options?: ImageURLOptions): string | null;

  /**
   * A link to the user's banner.
   * <info>This method will throw an error if called before the user is force fetched.
   * See {@link User.banner} for more info</info>
   * @param options Options for the Image URL
   */
  public bannerURL(options?: ImageURLOptions): string | null;

  /**
   * Creates a DM channel between the client and the user.
   * @param force Whether to skip the cache check and request the API
   */
  public createDM(force?: boolean): Promise<DMChannel>;

  /**
   * Deletes a DM channel (if one exists) between the client and the user. Resolves with the channel if successful.
   */
  public deleteDM(): Promise<DMChannel>;

  /**
   * A link to the user's avatar if they have one.
   * Otherwise a link to their default avatar will be returned.
   * @param options Options for the Image URL
   */
  public displayAvatarURL(options?: ImageURLOptions): string;

  /**
   * Checks if the user is equal to another.
   * It compares id, username, discriminator, avatar, banner, accent color, and bot flags.
   * It is recommended to compare equality by using `user.id === user2.id` unless you want to compare all properties.
   * @param user User to compare with
   */
  public equals(user: User): boolean;

  /**
   * Fetches this user.
   * @param force Whether to skip the cache check and request the API
   */
  public fetch(force?: boolean): Promise<User>;

  /**
   * Fetches this user's flags.
   * @param force Whether to skip the cache check and request the API
   */
  public fetchFlags(force?: boolean): Promise<UserFlags>;

  /**
   * When concatenated with a string, this automatically returns the user's mention instead of the User object.
   * @example
   * // Logs: Hello from <@123456789012345678>!
   * console.log(`Hello from ${user}!`);
   */
  public toString(): UserMention;
}

/**
 * Represents a user context menu interaction.
 */
export class UserContextMenuInteraction<Cached extends CacheType = CacheType> extends ContextMenuInteraction<Cached> {
  /**
   * The user this interaction was sent from
   */
  public readonly targetUser: User;

  /**
   * The member this interaction was sent from
   */
  public readonly targetMember: CacheTypeReducer<Cached, GuildMember, APIInteractionGuildMember>;

  /**
   * Indicates whether this interaction is received from a guild.
   */
  public inGuild(): this is UserContextMenuInteraction<'present'>;

  /**
   * Indicates whether or not this interaction is both cached and received from a guild.
   */
  public inCachedGuild(): this is UserContextMenuInteraction<'cached'>;

  /**
   * Indicates whether or not this interaction is received from an uncached guild.
   */
  public inRawGuild(): this is UserContextMenuInteraction<'raw'>;
}

/**
 * Data structure that makes it easy to interact with a {@link User.flags} bitfield.
 */
export class UserFlags extends BitField<UserFlagsString> {
  /**
   * Numeric user flags.
   * @see {@link [User Flags](https://discord.com/developers/docs/resources/user#user-object-user-flags)}
   */
  public static FLAGS: Record<UserFlagsString, number>;

  /**
   * Resolves bitfields to their numeric form.
   * @param bit bit(s) to resolve
   */
  public static resolve(bit?: BitFieldResolvable<UserFlagsString, number>): number;
}

/**
 * Contains various general-purpose utility methods.
 */
export class Util extends null {
  private constructor();

  /**
   * Creates a sweep filter that sweeps archived threads
   * @param lifetime How long a thread has to be archived to be valid for sweeping
   * @deprecated When not using with `makeCache` use `Sweepers.archivedThreadSweepFilter` instead
   */
  public static archivedThreadSweepFilter<K, V>(lifetime?: number): SweepFilter<K, V>;

  /**
   * Alternative to Node's `path.basename`, removing query string after the extension if it exists.
   * @param path Path to get the basename of
   * @param ext File extension to remove
   * @returns Basename of the path
   */
  public static basename(path: string, ext?: string): string;

  /**
   * The content to have all mentions replaced by the equivalent text.
   * <warn>When {@link Util.removeMentions} is removed, this method will no longer sanitize mentions.
   * Use {@link MessageOptions.allowedMentions} instead to prevent mentions when sending a message.</warn>
   * @param str The string to be converted
   * @param channel The channel the string was sent in
   */
  public static cleanContent(str: string, channel: TextBasedChannel): string;

  /**
   * Breaks user, role and everyone/here mentions by adding a zero width space after every @ character
   * @param str The string to sanitize
   * @deprecated Use {@link MessageOptions.allowedMentions} instead.
   */
  public static removeMentions(str: string): string;

  private static _removeMentions(str: string): string;

  /**
   * Shallow-copies an object with its class/prototype intact.
   * @param obj Object to clone
   */
  public static cloneObject(obj: unknown): unknown;

  /**
   * Sorts by Discord's position and id.
   * @param collection Collection of objects to sort
   */
  public static discordSort<K, V extends { rawPosition: number; id: Snowflake }>(
    collection: Collection<K, V>,
  ): Collection<K, V>;

  /**
   * Escapes any Discord-flavour markdown in a string.
   * @param text Content to escape
   * @param options Options for escaping the markdown
   */
  public static escapeMarkdown(text: string, options?: EscapeMarkdownOptions): string;

  /**
   * Escapes code block markdown in a string.
   * @param text Content to escape
   */
  public static escapeCodeBlock(text: string): string;

  /**
   * Escapes inline code markdown in a string.
   * @param text Content to escape
   */
  public static escapeInlineCode(text: string): string;

  /**
   * Escapes bold markdown in a string.
   * @param text Content to escape
   */
  public static escapeBold(text: string): string;

  /**
   * Escapes italic markdown in a string.
   * @param text Content to escape
   */
  public static escapeItalic(text: string): string;

  /**
   * Escapes underline markdown in a string.
   * @param text Content to escape
   */
  public static escapeUnderline(text: string): string;

  /**
   * Escapes strikethrough markdown in a string.
   * @param text Content to escape
   */
  public static escapeStrikethrough(text: string): string;

  /**
   * Escapes spoiler markdown in a string.
   * @param text Content to escape
   */
  public static escapeSpoiler(text: string): string;

  /**
   * The content to put in a code block with all code block fences replaced by the equivalent backticks.
   * @param text The string to be converted
   */
  public static cleanCodeBlockContent(text: string): string;

  /**
   * Gets the recommended shard count from Discord.
   * @param token Discord auth token
   * @param options Options for fetching the recommended shard count
   * @returns The recommended number of shards
   */
  public static fetchRecommendedShards(token: string, options?: FetchRecommendedShardsOptions): Promise<number>;

  /**
   * Flatten an object. Any properties that are collections will get converted to an array of keys.
   * @param obj The object to flatten.
   * @param props Specific properties to include/exclude.
   */
  public static flatten(obj: unknown, ...props: Record<string, boolean | string>[]): unknown;

  /**
   * Makes an Error from a plain info object.
   * @param obj Error info
   */
  public static makeError(obj: MakeErrorOptions): Error;

  /**
   * Makes a plain error info object from an Error.
   * @param err Error to get info from
   */
  public static makePlainError(err: Error): MakeErrorOptions;

  /**
   * Sets default properties on an object that aren't already specified.
   * @param def Default properties
   * @param given Object to assign defaults to
   */
  public static mergeDefault(def: unknown, given: unknown): unknown;

  /**
   * Moves an element in an array *in place*.
   * @param array Array to modify
   * @param element Element to move
   * @param newIndex Index or offset to move the element to
   * @param offset Move the element by an offset amount rather than to a set index
   */
  public static moveElementInArray(array: unknown[], element: unknown, newIndex: number, offset?: boolean): number;

  /**
   * Parses emoji info out of a string. The string must be one of:
   * * A UTF-8 emoji (no id)
   * * A URL-encoded UTF-8 emoji (no id)
   * * A Discord custom emoji (`<:name:id>` or `<a:name:id>`)
   * @param text Emoji string to parse
   * @returns Object with `animated`, `name`, and `id` properties
   */
  public static parseEmoji(text: string): { animated: boolean; name: string; id: Snowflake | null } | null;

  /**
   * Resolves a ColorResolvable into a color number.
   * @param color Color to resolve
   * @returns A color
   */
  public static resolveColor(color: ColorResolvable): number;

  /**
   * Resolves a partial emoji object from an {@link EmojiIdentifierResolvable}, without checking a Client.
   * @param emoji Emoji identifier to resolve
   */
  public static resolvePartialEmoji(emoji: EmojiIdentifierResolvable): Partial<APIPartialEmoji> | null;

  /**
   * Verifies the provided data is a string, otherwise throws provided error.
   * @param data The string resolvable to resolve
   * @param error The Error constructor to instantiate. Defaults to Error
   * @param errorMessage The error message to throw with. Defaults to "Expected string, got <data> instead."
   * @param allowEmpty Whether an empty string should be allowed
   */
  public static verifyString(data: string, error?: typeof Error, errorMessage?: string, allowEmpty?: boolean): string;

  /**
   * Sets the position of a Channel or Role.
   * @param item Object to set the position of
   * @param position New position for the object
   * @param relative Whether `position` is relative to its current position
   * @param sorted A collection of the objects sorted properly
   * @param route Route to call PATCH on
   * @param reason Reason for the change
   * @returns Updated item list, with `id` and `position` properties
   */
  public static setPosition<T extends AnyChannel | Role>(
    item: T,
    position: number,
    relative: boolean,
    sorted: Collection<Snowflake, T>,
    route: unknown,
    reason?: string,
  ): Promise<{ id: Snowflake; position: number }[]>;

  /**
   * Splits a string into multiple chunks at a designated character that do not exceed a specific length.
   * @param text Content to split
   * @param options Options controlling the behavior of the split
   */
  public static splitMessage(text: string, options?: SplitOptions): string[];
}

/**
 * Contains various Discord-specific functions for formatting messages.
 */
export class Formatters extends null {
  /**
   * Formats the content into a block quote. This needs to be at the start of the line for Discord to format it.
   * @param content The content to wrap.
   */
  public static blockQuote: typeof blockQuote;

  /**
   * Formats the content into bold text.
   * @param content The content to wrap.
   */
  public static bold: typeof bold;

  /**
   * Formats a channel id into a channel mention.
   * @param channelId The channel id to format.
   */
  public static channelMention: typeof channelMention;

  /**
   * Wraps the content inside a code block with an optional language.
   * @param contentOrLanguage The language to use, content if a second parameter isn't provided.
   * @param content The content to wrap.
   */
  public static codeBlock: typeof codeBlock;

  /**
   * Formats an emoji id into a fully qualified emoji identifier
   * @param emojiId The emoji id to format.
   * @param animated Whether the emoji is animated or not. Defaults to `false`
   */
  public static formatEmoji: typeof formatEmoji;

  /**
   * Wraps the URL into `<>`, which stops it from embedding.
   * @param content The content to wrap.
   */
  public static hideLinkEmbed: typeof hideLinkEmbed;

  /**
   * Formats the content and the URL into a masked URL with an optional title.
   * @param content The content to display.
   * @param url The URL the content links to.
   * @param title The title shown when hovering on the masked link.
   */
  public static hyperlink: typeof hyperlink;

  /**
   * Wraps the content inside \`backticks\`, which formats it as inline code.
   * @param content The content to wrap.
   */
  public static inlineCode: typeof inlineCode;

  /**
   * Formats the content into italic text.
   * @param content The content to wrap.
   */
  public static italic: typeof italic;

  /**
   * Formats a user id into a member-nickname mention.
   * @param memberId The user id to format.
   */
  public static memberNicknameMention: typeof memberNicknameMention;

  /**
   * Formats the content into a quote. This needs to be at the start of the line for Discord to format it.
   * @param content The content to wrap.
   */
  public static quote: typeof quote;

  /**
   * Formats a role id into a role mention.
   * @param roleId The role id to format.
   */
  public static roleMention: typeof roleMention;

  /**
   * Formats the content into spoiler text.
   * @param content The content to spoiler.
   */
  public static spoiler: typeof spoiler;

  /**
   * Formats the content into strike-through text.
   * @param content The content to wrap.
   */
  public static strikethrough: typeof strikethrough;

  /**
   * Formats a date into a short date-time string.
   * @param date The date to format.
   * @param style The style to use.
   */
  public static time: typeof time;

  /**
   * The message formatting timestamp
   * [styles](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles) supported by Discord.
   */
  public static TimestampStyles: typeof TimestampStyles;

  /**
   * A message formatting timestamp style, as defined in
   * [here](https://discord.com/developers/docs/reference#message-formatting-timestamp-styles).
   * * `t` Short time format, consisting of hours and minutes, e.g. 16:20.
   * * `T` Long time format, consisting of hours, minutes, and seconds, e.g. 16:20:30.
   * * `d` Short date format, consisting of day, month, and year, e.g. 20/04/2021.
   * * `D` Long date format, consisting of day, month, and year, e.g. 20 April 2021.
   * * `f` Short date-time format, consisting of short date and short time formats, e.g. 20 April 2021 16:20.
   * * `F` Long date-time format, consisting of long date and short time formats, e.g. Tuesday, 20 April 2021 16:20.
   * * `R` Relative time format, consisting of a relative duration format, e.g. 2 months ago.
   */
  public static TimestampStylesString: TimestampStylesString;

  /**
   * Formats the content into underscored text.
   * @param content The content to wrap.
   */
  public static underscore: typeof underscore;

  /**
   * Formats a user id into a user mention.
   * @param userId The user id to format.
   */
  public static userMention: typeof userMention;
}

/**
 * Represents a guild voice channel on Discord.
 */
export class VoiceChannel extends BaseGuildVoiceChannel {
  /**
   * Whether the channel is editable by the client user
   * @deprecated Use {@link VoiceChannel.manageable} instead
   */
  public readonly editable: boolean;

  /**
   * Checks if the client has permission to send audio to the voice channel
   */
  public readonly speakable: boolean;

  /**
   * The type of the channel
   */
  public type: 'GUILD_VOICE';

  /**
   * Sets the bitrate of the channel.
   * @param bitrate The new bitrate
   * @param reason Reason for changing the channel's bitrate
   * @example
   * // Set the bitrate of a voice channel
   * voiceChannel.setBitrate(48_000)
   *   .then(vc => console.log(`Set bitrate to ${vc.bitrate}bps for ${vc.name}`))
   *   .catch(console.error);
   */
  public setBitrate(bitrate: number, reason?: string): Promise<VoiceChannel>;

  /**
   * Sets the user limit of the channel.
   * @param userLimit The new user limit
   * @param reason Reason for changing the user limit
   * @example
   * // Set the user limit of a voice channel
   * voiceChannel.setUserLimit(42)
   *   .then(vc => console.log(`Set user limit to ${vc.userLimit} for ${vc.name}`))
   *   .catch(console.error);
   */
  public setUserLimit(userLimit: number, reason?: string): Promise<VoiceChannel>;
}

/**
 * Represents a Discord voice region for guilds.
 */
export class VoiceRegion {
  public constructor(data: RawVoiceRegionData);

  /**
   * Whether the region is custom
   */
  public custom: boolean;

  /**
   * Whether the region is deprecated
   */
  public deprecated: boolean;

  /**
   * The region's id
   */
  public id: string;

  /**
   * Name of the region
   */
  public name: string;

  /**
   * Whether the region is optimal
   */
  public optimal: boolean;

  /**
   * Whether the region is VIP-only
   */
  public vip: boolean;

  /**
   * Transforms the voice region to a plain object.
   */
  public toJSON(): unknown;
}

/**
 * Represents the voice state for a Guild Member.
 */
export class VoiceState extends Base {
  /**
   * @param guild The guild the voice state is part of
   * @param data The data for the voice state
   */
  public constructor(guild: Guild, data: RawVoiceStateData);

  /**
   * The channel that the member is connected to
   */
  public readonly channel: VoiceBasedChannel | null;

  /**
   * The {@link VoiceChannel} or {@link StageChannel} id the member is in
   */
  public channelId: Snowflake | null;

  /**
   * Whether this member is either self-deafened or server-deafened
   */
  public readonly deaf: boolean | null;

  /**
   * The guild of this voice state
   */
  public guild: Guild;

  /**
   * The id of the member of this voice state
   */
  public id: Snowflake;

  /**
   * The member that this voice state belongs to
   */
  public readonly member: GuildMember | null;

  /**
   * Whether this member is either self-muted or server-muted
   */
  public readonly mute: boolean | null;

  /**
   * Whether this member is deafened server-wide
   */
  public selfDeaf: boolean | null;

  /**
   * Whether this member is muted server-wide
   */
  public selfMute: boolean | null;

  /**
   * Whether this member is self-deafened
   */
  public serverDeaf: boolean | null;

  /**
   * Whether this member is self-muted
   */
  public serverMute: boolean | null;

  /**
   * The session id for this member's connection
   */
  public sessionId: string | null;

  /**
   * Whether this member is streaming using "Screen Share"
   */
  public streaming: boolean;

  /**
   * Whether this member's camera is enabled
   */
  public selfVideo: boolean | null;

  /**
   * Whether this member is suppressed from speaking. This property is specific to stage channels only.
   */
  public suppress: boolean;

  /**
   * The time at which the member requested to speak. This property is specific to stage channels only.
   */
  public requestToSpeakTimestamp: number | null;

  /**
   * Deafens/undeafens the member of this voice state.
   * @param deaf Whether or not the member should be deafened
   * @param reason Reason for deafening or undeafening
   */
  public setDeaf(deaf?: boolean, reason?: string): Promise<GuildMember>;

  /**
   * Mutes/unmutes the member of this voice state.
   * @param mute Whether or not the member should be muted
   * @param reason Reason for muting or unmuting
   */
  public setMute(mute?: boolean, reason?: string): Promise<GuildMember>;

  /**
   * Disconnects the member from the channel.
   * @param reason Reason for disconnecting the member from the channel
   */
  public disconnect(reason?: string): Promise<GuildMember>;

  /**
   * Moves the member to a different channel, or disconnects them from the one they're in.
   * @param channel Channel to move the member to, or `null` if you want to
   * disconnect them from voice.
   * @param reason Reason for moving member to another channel or disconnecting
   */
  public setChannel(channel: GuildVoiceChannelResolvable | null, reason?: string): Promise<GuildMember>;

  /**
   * Toggles the request to speak in the channel.
   * Only applicable for stage channels and for the client's own voice state.
   * @param request Whether or not the client is requesting to become a speaker.
   * @example
   * // Making the client request to speak in a stage channel (raise its hand)
   * guild.me.voice.setRequestToSpeak(true);
   * @example
   * // Making the client cancel a request to speak
   * guild.me.voice.setRequestToSpeak(false);
   * @returns {Promise<void>}
   */
  public setRequestToSpeak(request?: boolean): Promise<void>;

  /**
   * Suppress/unsuppress the user. Only applicable for stage channels.
   * @param suppressed Whether or not the user should be suppressed.
   * @example
   * // Making the client a speaker
   * guild.me.voice.setSuppressed(false);
   * @example
   * // Making the client an audience member
   * guild.me.voice.setSuppressed(true);
   * @example
   * // Inviting another user to speak
   * voiceState.setSuppressed(false);
   * @example
   * // Moving another user to the audience, or cancelling their invite to speak
   * voiceState.setSuppressed(true);
   * @returns {Promise<void>}
   */
  public setSuppressed(suppressed?: boolean): Promise<void>;
}

export class Webhook extends WebhookMixin() {
  public constructor(client: Client, data?: RawWebhookData);

  /**
   * The avatar for the webhook
   */
  public avatar: string;

  /**
   * A link to the webhook's avatar.
   * @param options Options for the Image URL
   * @returns {?string}
   */
  public avatarURL(options?: StaticImageURLOptions): string | null;

  /**
   * The channel the webhook belongs to
   */
  public channelId: Snowflake;

  /**
   * The client that instantiated the webhook
   */
  public client: Client;

  /**
   * The guild the webhook belongs to
   */
  public guildId: Snowflake;

  /**
   * The name of the webhook
   */
  public name: string;

  /**
   * The owner of the webhook
   */
  public owner: User | APIUser | null;

  /**
   * The source guild of the webhook
   */
  public sourceGuild: Guild | APIPartialGuild | null;

  /**
   * The source channel of the webhook
   */
  public sourceChannel: NewsChannel | APIPartialChannel | null;

  /**
   * The token for the webhook, unavailable for follower webhooks and webhooks owned by another application.
   */
  public token: string | null;

  /**
   * The type of the webhook
   */
  public type: WebhookType;

  /**
   * Whether or not this webhook is an incoming webhook.
   */
  public isIncoming(): this is this & { token: string };

  /**
   * Whether or not this webhook is a channel follower webhook.
   */
  public isChannelFollower(): this is this & {
    sourceGuild: Guild | APIPartialGuild;
    sourceChannel: NewsChannel | APIPartialChannel;
  };
}

/**
 * The webhook client.
 */
export class WebhookClient extends WebhookMixin(BaseClient) {
  /**
   * @param data The data of the webhook
   * @param options Options for the client
   */
  public constructor(data: WebhookClientData, options?: WebhookClientOptions);

  /**
   * This
   */
  public client: this;

  /**
   * The options the client was instantiated with
   */
  public options: WebhookClientOptions;

  /**
   * The token of the webhook
   */
  public token: string;

  /**
   * Edits a message that was sent by this webhook.
   * @param message The message to edit
   * @param options The options to provide
   * @returns Returns the raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   */
  public editMessage(
    message: MessageResolvable,
    options: string | MessagePayload | WebhookEditMessageOptions,
  ): Promise<APIMessage>;

  /**
   * Gets a message that was sent by this webhook.
   * @param message The id of the message to fetch
   * @param options The options to provide to fetch the message.
   * @returns Returns the raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   */
  public fetchMessage(message: Snowflake, options?: WebhookFetchMessageOptions): Promise<APIMessage>;

  /* tslint:disable:unified-signatures */
  /**
   * Gets a message that was sent by this webhook.
   * @param message The id of the message to fetch
   * @param cache boolean passed to specify whether to cache the message
   * @returns Returns the raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   * @deprecated
   */
  public fetchMessage(message: Snowflake, cache?: boolean): Promise<APIMessage>;
  /* tslint:enable:unified-signatures */

  /**
   * Sends a message with this webhook.
   * @param options The options to provide
   * @example
   * // Send a basic message
   * webhook.send('hello!')
   *   .then(message => console.log(`Sent message: ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Send a basic message in a thread
   * webhook.send({ content: 'hello!', threadId: '836856309672348295' })
   *   .then(message => console.log(`Sent message: ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Send a remote file
   * webhook.send({
   *   files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send a local file
   * webhook.send({
   *   files: [{
   *     attachment: 'entire/path/to/file.jpg',
   *     name: 'file.jpg'
   *   }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send an embed with a local image inside
   * webhook.send({
   *   content: 'This is an embed',
   *   embeds: [{
   *     thumbnail: {
   *          url: 'attachment://file.jpg'
   *       }
   *    }],
   *    files: [{
   *       attachment: 'entire/path/to/file.jpg',
   *       name: 'file.jpg'
   *    }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public send(options: string | MessagePayload | WebhookMessageOptions): Promise<APIMessage>;
}

/**
 * The WebSocket manager for this client.
 * <info>This class forwards raw dispatch events,
 * read more about it here {@link https://discord.com/developers/docs/topics/gateway}</info>
 */
export class WebSocketManager extends EventEmitter {
  public constructor(client: Client);

  /**
   * The amount of shards this manager handles
   */
  private totalShards: number | string;

  /**
   * An array of shards to be connected or that need to reconnect
   */
  private shardQueue: Set<WebSocketShard>;

  /**
   * An array of queued events before this WebSocketManager became ready
   */
  private packetQueue: unknown[];

  /**
   * If this manager was destroyed. It will prevent shards from reconnecting
   */
  private destroyed: boolean;

  /**
   * If this manager is currently reconnecting one or multiple shards
   */
  private reconnecting: boolean;

  /**
   * The client that instantiated this WebSocketManager
   */
  public readonly client: Client;

  /**
   * The gateway this manager uses
   */
  public gateway: string | null;

  /**
   * A collection of all shards this manager handles
   */
  public shards: Collection<number, WebSocketShard>;

  /**
   * The current status of this WebSocketManager
   */
  public status: Status;

  /**
   * The average ping of all WebSocketShards
   */
  public readonly ping: number;

  public on(event: WSEventType, listener: (data: any, shardId: number) => void): this;

  public once(event: WSEventType, listener: (data: any, shardId: number) => void): this;

  /**
   * Emits a debug message.
   * @param message The debug message
   * @param shard The shard that emitted this message, if any
   */
  private debug(message: string, shard?: WebSocketShard): void;

  /**
   * Connects this manager to the gateway.
   */
  private connect(): Promise<void>;

  /**
   * Handles the creation of a shard.
   */
  private createShards(): Promise<void>;

  /**
   * Handles reconnects for this manager.
   */
  private reconnect(): Promise<void>;

  /**
   * Broadcasts a packet to every shard this manager handles.
   * @param packet The packet to send
   */
  private broadcast(packet: unknown): void;

  /**
   * Destroys this manager and all its shards.
   */
  private destroy(): void;

  /**
   * Processes a packet and queues it if this WebSocketManager is not ready.
   * @param packet The packet to be handled
   * @param shard The shard that will handle this packet
   */
  private handlePacket(packet?: unknown, shard?: WebSocketShard): boolean;

  /**
   * Checks whether the client is ready to be marked as ready.
   */
  private checkShardsReady(): void;

  /**
   * Causes the client to be marked as ready and emits the ready event.
   */
  private triggerClientReady(): void;
}

export interface WebSocketShardEvents {
  /**
   * Emitted when the shard receives the READY payload and is now waiting for guilds
   */
  ready: [];

  /**
   * Emitted when the shard resumes successfully
   */
  resumed: [];

  invalidSession: [];

  /**
   * Emitted when a shard's WebSocket closes.
   * @param event The received event
   */
  close: [event: CloseEvent];

  /**
   * Emitted when the shard is fully ready.
   * This event is emitted if:
   * * all guilds were received by this shard
   * * the ready timeout expired, and some guilds are unavailable
   * @param unavailableGuilds Set of unavailable guilds, if any
   */
  allReady: [unavailableGuilds?: Set<Snowflake>];
}

/**
 * Represents a Shard's WebSocket connection
 */
export class WebSocketShard extends EventEmitter {
  public constructor(manager: WebSocketManager, id: number);

  /**
   * The current sequence of the shard
   */
  private sequence: number;

  /**
   * The sequence of the shard after close
   */
  private closeSequence: number;

  /**
   * The current session id of the shard
   */
  private sessionId: string | null;

  /**
   * The last time a ping was sent (a timestamp)
   */
  private lastPingTimestamp: number;

  /**
   * If we received a heartbeat ack back. Used to identify zombie connections
   */
  private lastHeartbeatAcked: boolean;

  /**
   * Contains the rate limit queue and metadata
   */
  private ratelimit: { queue: unknown[]; total: number; remaining: number; time: 60e3; timer: NodeJS.Timeout | null };

  /**
   * The WebSocket connection for the current shard
   */
  private connection: WebSocket | null;

  /**
   * The HELLO timeout
   */
  private helloTimeout: NodeJS.Timeout | null;

  /**
   * If the manager attached its event handlers on the shard
   */
  private eventsAttached: boolean;

  /**
   * A set of guild ids this shard expects to receive
   */
  private expectedGuilds: Set<Snowflake> | null;

  /**
   * The ready timeout
   */
  private readyTimeout: NodeJS.Timeout | null;

  /**
   * The WebSocketManager of the shard
   */
  public manager: WebSocketManager;

  /**
   * The shard's id
   */
  public id: number;

  /**
   * The current status of the shard
   */
  public status: Status;

  /**
   * The previous heartbeat ping of the shard
   */
  public ping: number;

  /**
   * Emits a debug event.
   * @param message The debug message
   */
  private debug(message: string): void;

  /**
   * Connects the shard to the gateway.
   * @returns A promise that will resolve if the shard turns ready successfully,
   * or reject if we couldn't connect
   */
  private connect(): Promise<void>;

  /**
   * Called whenever a connection is opened to the gateway.
   */
  private onOpen(): void;

  /**
   * Called whenever a message is received.
   * @param event Event received
   */
  private onMessage(event: MessageEvent): void;

  /**
   * Called whenever an error occurs with the WebSocket.
   * @param event The error that occurred
   */
  private onError(error: ErrorEvent | unknown): void;

  /**
   * Called whenever a connection to the gateway is closed.
   * @param event Close event that was received
   */
  private onClose(event: CloseEvent): void;

  /**
   * Called whenever a packet is received.
   * @param packet The received packet
   */
  private onPacket(packet: unknown): void;

  /**
   * Checks if the shard can be marked as ready
   */
  private checkReady(): void;

  /**
   * Sets the HELLO packet timeout.
   * @param time If set to -1, it will clear the hello timeout
   */
  private setHelloTimeout(time?: number): void;

  /**
   * Sets the heartbeat timer for this shard.
   * @param time If -1, clears the interval, any other number sets an interval
   */
  private setHeartbeatTimer(time: number): void;

  /**
   * Sends a heartbeat to the WebSocket.
   * If this shard didn't receive a heartbeat last time, it will destroy it and reconnect
   * @param tag What caused this heartbeat to be sent
   * @param ignoreHeartbeatAck If we should send the heartbeat forcefully.
   */
  private sendHeartbeat(): void;

  /**
   * Acknowledges a heartbeat.
   */
  private ackHeartbeat(): void;

  /**
   * Identifies the client on the connection.
   */
  private identify(): void;

  /**
   * Identifies as a new connection on the gateway.
   */
  private identifyNew(): void;

  /**
   * Resumes a session on the gateway.
   */
  private identifyResume(): void;

  /**
   * Sends data, bypassing the queue.
   * @param data Packet to send
   */
  private _send(data: unknown): void;

  /**
   * Processes the current WebSocket queue.
   */
  private processQueue(): void;

  /**
   * Destroys this shard and closes its WebSocket connection.
   * @param options Options for destroying the shard
   */
  private destroy(destroyOptions?: { closeCode?: number; reset?: boolean; emit?: boolean; log?: boolean }): void;

  /**
   * Cleans up the WebSocket connection listeners.
   */
  private _cleanupConnection(): void;

  /**
   * Emits the DESTROYED event on the shard
   */
  private _emitDestroyed(): void;

  /**
   * Adds a packet to the queue to be sent to the gateway.
   * <warn>If you use this method, make sure you understand that you need to provide
   * a full [Payload](https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-commands).
   * Do not use this method if you don't know what you're doing.</warn>
   * @param data The full packet to send
   * @param important If this packet should be added first in queue
   */
  public send(data: unknown, important?: boolean): void;

  public on<K extends keyof WebSocketShardEvents>(
    event: K,
    listener: (...args: WebSocketShardEvents[K]) => Awaitable<void>,
  ): this;

  public once<K extends keyof WebSocketShardEvents>(
    event: K,
    listener: (...args: WebSocketShardEvents[K]) => Awaitable<void>,
  ): this;
}

/**
 * Represents a Widget.
 */
export class Widget extends Base {
  /**
   * @param client The instantiating client
   * @param data The raw data
   */
  public constructor(client: Client, data: RawWidgetData);

  /**
   * Builds the widget with the provided data.
   * @param data The raw data of the widget
   * @private
   */
  private _patch(data: RawWidgetData): void;

  /**
   * Update the Widget.
   */
  public fetch(): Promise<Widget>;

  /**
   * The id of the guild.
   */
  public id: Snowflake;

  /**
   * The invite of the guild.
   */
  public instantInvite?: string;

  /**
   * The list of channels in the guild.
   */
  public channels: Collection<Snowflake, WidgetChannel>;

  /**
   * The list of members in the guild.
   * These strings are just arbitrary numbers, they aren't Snowflakes.
   */
  public members: Collection<string, WidgetMember>;

  /**
   * The number of members online.
   */
  public presenceCount: number;
}

/**
 * Represents a WidgetMember.
 */
export class WidgetMember extends Base {
  /**
   * @param client The instantiating client
   * @param data The raw data
   */
  public constructor(client: Client, data: RawWidgetMemberData);

  /**
   * The id of the user. It's an arbitrary number.
   */
  public id: string;

  /**
   * The username of the member.
   */
  public username: string;

  /**
   * The discriminator of the member.
   */
  public discriminator: string;

  /**
   * The avatar of the member.
   */
  public avatar: string | null;

  /**
   * The status of the member.
   */
  public status: PresenceStatus;

  /**
   * If the member is server deafened
   */
  public deaf: boolean | null;

  /**
   * If the member is server muted
   */
  public mute: boolean | null;

  /**
   * If the member is self deafened
   */
  public selfDeaf: boolean | null;

  /**
   * If the member is self muted
   */
  public selfMute: boolean | null;

  /**
   * If the member is suppressed
   */
  public suppress: boolean | null;

  /**
   * The id of the voice channel the member is in, if any
   */
  public channelId: Snowflake | null;

  /**
   * The avatar URL of the member.
   */
  public avatarURL: string;

  /**
   * The activity of the member.
   */
  public activity: WidgetActivity | null;
}

/**
 * Represents a channel link in a guild's welcome screen.
 */
export class WelcomeChannel extends Base {
  constructor(guild: Guild, data: RawWelcomeChannelData);

  /**
   * The raw emoji data
   */
  private _emoji: Omit<APIEmoji, 'animated'>;

  /**
   * The id of this welcome channel
   */
  public channelId: Snowflake;

  /**
   * The guild for this welcome channel
   */
  public guild: Guild | InviteGuild;

  /**
   * The description of this welcome channel
   */
  public description: string;

  /**
   * The channel of this welcome channel
   */
  public readonly channel: TextChannel | NewsChannel | StoreChannel | null;

  /**
   * The emoji of this welcome channel
   */
  public readonly emoji: GuildEmoji | Emoji;
}

/**
 * Represents a welcome screen.
 */
export class WelcomeScreen extends Base {
  constructor(guild: Guild, data: RawWelcomeScreenData);

  /**
   * Whether the welcome screen is enabled on the guild or not
   */
  public readonly enabled: boolean;

  /**
   * The guild for this welcome screen
   */
  public guild: Guild | InviteGuild;

  /**
   * The description of this welcome screen
   */
  public description: string | null;

  /**
   * Collection of welcome channels belonging to this welcome screen
   */
  public welcomeChannels: Collection<Snowflake, WelcomeChannel>;
}

//#endregion

//#region Constants

export type EnumHolder<T> = { [P in keyof T]: T[P] };

export type ExcludeEnum<T, K extends keyof T> = Exclude<keyof T | T[keyof T], K | T[K]>;

export const Constants: {
  Package: {
    name: string;
    version: string;
    description: string;
    license: string;
    main: string;
    types: string;
    homepage: string;
    keywords: string[];
    bugs: { url: string };
    repository: { type: string; url: string };
    scripts: Record<string, string>;
    engines: Record<string, string>;
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
    [key: string]: unknown;
  };
  UserAgent: string;
  Endpoints: {
    botGateway: string;
    invite: (root: string, code: string, eventId?: Snowflake) => string;
    scheduledEvent: (root: string, guildId: Snowflake, eventId: Snowflake) => string;
    CDN: (root: string) => {
      Emoji: (emojiId: Snowflake, format: DynamicImageFormat) => string;
      Asset: (name: string) => string;
      DefaultAvatar: (discriminator: number) => string;
      Avatar: (
        userId: Snowflake,
        hash: string,
        format: DynamicImageFormat,
        size: AllowedImageSize,
        dynamic: boolean,
      ) => string;
      Banner: (
        id: Snowflake,
        hash: string,
        format: DynamicImageFormat,
        size: AllowedImageSize,
        dynamic: boolean,
      ) => string;
      GuildMemberAvatar: (
        guildId: Snowflake,
        memberId: Snowflake,
        hash: string,
        format?: DynamicImageFormat,
        size?: AllowedImageSize,
        dynamic?: boolean,
      ) => string;
      Icon: (
        guildId: Snowflake,
        hash: string,
        format: DynamicImageFormat,
        size: AllowedImageSize,
        dynamic: boolean,
      ) => string;
      AppIcon: (
        appId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ) => string;
      AppAsset: (
        appId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ) => string;
      StickerPackBanner: (bannerId: Snowflake, format: AllowedImageFormat, size: AllowedImageSize) => string;
      GDMIcon: (channelId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize) => string;
      Splash: (guildId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize) => string;
      DiscoverySplash: (guildId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize) => string;
      TeamIcon: (
        teamId: Snowflake,
        hash: string,
        { format, size }: { format: AllowedImageFormat; size: AllowedImageSize },
      ) => string;
      Sticker: (stickerId: Snowflake, stickerFormat: StickerFormatType) => string;
      RoleIcon: (roleId: Snowflake, hash: string, format: AllowedImageFormat, size: AllowedImageSize) => string;
    };
  };

  WSCodes: {
    1000: 'WS_CLOSE_REQUESTED';
    4004: 'TOKEN_INVALID';
    4010: 'SHARDING_INVALID';
    4011: 'SHARDING_REQUIRED';
  };

  Events: ConstantsEvents;

  ShardEvents: ConstantsShardEvents;

  /**
   * The type of Structure allowed to be a partial
   * <warn>Partials require you to put checks in place when handling data. See the "Partial Structures" topic on the
   * [guide](https://discordjs.guide/popular-topics/partials.html) for more information.</warn>
   */
  PartialTypes: {
    [K in PartialTypes]: K;
  };

  /**
   * The type of a WebSocket message event, e.g. `MESSAGE_CREATE`.
   * @see {@link [Gateway Events](https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events)}
   */
  WSEvents: {
    [K in WSEventType]: K;
  };

  Colors: ConstantsColors;

  /**
   * The current status of the client.
   */
  Status: ConstantsStatus;

  Opcodes: ConstantsOpcodes;

  /**
   * An error encountered while performing an API request.
   * @see {@link [JSON Error Codes](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes)}
   */
  APIErrors: APIErrors;

  /**
   * All available channel types:
   * * `GUILD_TEXT` - a guild text channel
   * * `DM` - a DM channel
   * * `GUILD_VOICE` - a guild voice channel
   * * `GROUP_DM` - a group DM channel
   * * `GUILD_CATEGORY` - a guild category channel
   * * `GUILD_NEWS` - a guild news channel
   * * `GUILD_STORE` - a guild store channel.
   * <warn>Store channels are deprecated and will be removed from Discord in March 2022. See
   * [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/4414590563479)
   * for more information.</warn>
   * * `GUILD_NEWS_THREAD` - a guild news channel's public thread channel
   * * `GUILD_PUBLIC_THREAD` - a guild text channel's public thread channel
   * * `GUILD_PRIVATE_THREAD` - a guild text channel's private thread channel
   * * `GUILD_STAGE_VOICE` - a guild stage voice channel
   * * `UNKNOWN` - a generic channel of unknown type, could be Channel or GuildChannel
   * @see {@link [Channel Types](https://discord.com/developers/docs/resources/channel#channel-object-channel-types)}
   */
  ChannelTypes: EnumHolder<typeof ChannelTypes>;

  /**
   * The types of channels that are threads.
   */
  ThreadChannelTypes: ThreadChannelTypes[];

  /**
   * The types of channels that are text-based.
   */
  TextBasedChannelTypes: TextBasedChannelTypes[];

  /**
   * The types of channels that are voice-based.
   */
  VoiceBasedChannelTypes: VoiceBasedChannelTypes[];

  ClientApplicationAssetTypes: ConstantsClientApplicationAssetTypes;

  /**
   * The behavior of expiring subscribers for Integrations.
   * @see {@link [Integration Expire Behaviors](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors)}
   */
  IntegrationExpireBehaviors: IntegrationExpireBehaviors[];

  /**
   * A valid scope to request when generating an invite link.
   * <warn>Scopes that require whitelist are not considered valid for this generator</warn>
   * * `applications.builds.read`: allows reading build data for a users applications
   * * `applications.commands`: allows this bot to create commands in the server
   * * `applications.entitlements`: allows reading entitlements for a users applications
   * * `applications.store.update`: allows reading and updating of store data for a users applications
   * * `bot`: makes the bot join the selected guild
   * * `connections`: makes the endpoint for getting a users connections available
   * * `email`: allows the `/users/@me` endpoint return with an email
   * * `identify`: allows the `/users/@me` endpoint without an email
   * * `guilds`: makes the `/users/@me/guilds` endpoint available for a user
   * * `guilds.join`: allows the bot to join the user to any guild it is in using Guild#addMember
   * * `gdm.join`: allows joining the user to a group dm
   * * `webhook.incoming`: generates a webhook to a channel
   * @see {@link [OAuth2 Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)}
   */
  InviteScopes: InviteScope[];

  /**
   * The type of a message, e.g. `DEFAULT`.
   * @see {@link [Message Types](https://discord.com/developers/docs/resources/channel#message-object-message-types)}
   */
  MessageTypes: MessageType[];

  /**
   * The types of messages that are `System`.
   */
  SystemMessageTypes: SystemMessageType[];

  /**
   * <info>Bots cannot set a `CUSTOM` activity type, it is only for custom statuses received from users</info>
   * The type of an activity of a user's presence.
   * @see {@link [ActivityType Enum](https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum)}
   */
  ActivityTypes: EnumHolder<typeof ActivityTypes>;

  /**
   * The value set for a sticker's type
   * @see {@link [Sticker Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)}
   */
  StickerTypes: EnumHolder<typeof StickerTypes>;

  /**
   * The value set for a sticker's format type
   * @see {@link [Sticker Format Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)}
   */
  StickerFormatTypes: EnumHolder<typeof StickerFormatTypes>;

  /**
   * An overwrite type
   * @see {@link [Overwrite Structure](https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure)}
   */
  OverwriteTypes: EnumHolder<typeof OverwriteTypes>;

  /**
   * The value set for the explicit content filter levels for a guild
   * @see {@link [Explicit Content Filter Level](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)}
   */
  ExplicitContentFilterLevels: EnumHolder<typeof ExplicitContentFilterLevels>;

  /**
   * The value set for a guild's default message notifications, e.g. `ALL_MESSAGES`.
   * @see {@link [Default Message Notification Level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level)}
   */
  DefaultMessageNotificationLevels: EnumHolder<typeof DefaultMessageNotificationLevels>;

  /**
   * The value set for the verification levels for a guild
   * @see {@link [Verification Level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)}
   */
  VerificationLevels: EnumHolder<typeof VerificationLevels>;

  /**
   * The value set for a team member's membership state
   * @see {@link [Membership State Enum](https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum)}
   */
  MembershipStates: EnumHolder<typeof MembershipStates>;

  /**
   * The type of an {@link ApplicationCommandOption} object
   * @see {@link [Application Command Option Type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)}
   */
  ApplicationCommandOptionTypes: EnumHolder<typeof ApplicationCommandOptionTypes>;

  /**
   * The type of an {@link ApplicationCommandPermissions} object
   * @see {@link [Application Command Permission Type](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type)}
   */
  ApplicationCommandPermissionTypes: EnumHolder<typeof ApplicationCommandPermissionTypes>;

  /**
   * The type of an {@link Interaction} object
   * @see {@link [interaction-object-interaction-type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type)}
   */
  InteractionTypes: EnumHolder<typeof InteractionTypes>;

  /**
   * The type of an interaction response
   * @see {@link [Interaction Type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)}
   */
  InteractionResponseTypes: EnumHolder<typeof InteractionResponseTypes>;

  /**
   * The type of a message component
   * @see {@link [Component Types](https://discord.com/developers/docs/interactions/message-components#component-object-component-types)}
   */
  MessageComponentTypes: EnumHolder<typeof MessageComponentTypes>;

  /**
   * The style of a message button
   * @see {@link [Button Styles](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)}
   */
  MessageButtonStyles: EnumHolder<typeof MessageButtonStyles>;

  /**
   * The required MFA level for a guild
   * @see {@link [MFA Level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level)}
   */
  MFALevels: EnumHolder<typeof MFALevels>;

  /**
   * NSFW level of a Guild
   * @see {@link [Guild NSFW Level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level)}
   */
  NSFWLevels: EnumHolder<typeof NSFWLevels>;

  /**
   * Privacy level of a {@link StageInstance} object
   * @see {@link [Privacy Level](https://discord.com/developers/docs/resources/stage-instance#stage-instance-object-privacy-level)}
   */
  PrivacyLevels: EnumHolder<typeof PrivacyLevels>;

  /**
   * The value set for a webhook's type
   * @see {@link [Webhook Types](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types)}
   */
  WebhookTypes: EnumHolder<typeof WebhookTypes>;

  /**
   * The premium tier (Server Boost level) of a guild
   * @see {@link [Premium Tier](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier)}
   */
  PremiumTiers: EnumHolder<typeof PremiumTiers>;

  /**
   * The type of an {@link ApplicationCommand} object
   * @see {@link [Application Command Types](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)}
   */
  ApplicationCommandTypes: EnumHolder<typeof ApplicationCommandTypes>;

  /**
   * The entity type of a {@link GuildScheduledEvent}
   * @see {@link [Guild Scheduled Event Entity Types](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types)}
   */
  GuildScheduledEventEntityTypes: EnumHolder<typeof GuildScheduledEventEntityTypes>;

  /**
   * The status of a {@link GuildScheduledEvent}
   * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-status}
   */
  GuildScheduledEventStatuses: EnumHolder<typeof GuildScheduledEventStatuses>;

  /**
   * Privacy level of a {@link GuildScheduledEvent} object
   * @see {@link [Guild Scheduled Event Privacy Level](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level)}
   */
  GuildScheduledEventPrivacyLevels: EnumHolder<typeof GuildScheduledEventPrivacyLevels>;
};

export const version: string;

//#endregion

//#region Managers

/**
 * Manages the API methods of a data model.
 */
export abstract class BaseManager {
  public constructor(client: Client);

  /**
   * The client that instantiated this Manager
   */
  public readonly client: Client;
}

/**
 * Manages the API methods of a data model along with a collection of instances.
 */
export abstract class DataManager<K, Holds, R> extends BaseManager {
  public constructor(client: Client, holds: Constructable<Holds>);

  /**
   * The data structure belonging to this manager.
   */
  public readonly holds: Constructable<Holds>;

  /**
   * The cache of items for this manager.
   */
  public readonly cache: Collection<K, Holds>;

  /**
   * Resolves a data entry to a data Object.
   * @param resolvable The id or instance of something in this Manager
   * @returns An instance from this Manager
   */
  public resolve(resolvable: Holds): Holds;
  public resolve(resolvable: R): Holds | null;

  /**
   * Resolves a data entry to an instance id.
   * @param resolvable The id or instance of something in this Manager
   */
  public resolveId(resolvable: K | Holds): K;
  public resolveId(resolvable: R): K | null;

  /**
   * Returns the cache.
   */
  public valueOf(): Collection<K, Holds>;
}

/**
 * Manages the API methods of a data model with a mutable cache of instances.
 */
export abstract class CachedManager<K, Holds, R> extends DataManager<K, Holds, R> {
  public constructor(client: Client, holds: Constructable<Holds>);
  private _add(data: unknown, cache?: boolean, { id, extras }?: { id: K; extras: unknown[] }): Holds;
}

export type ApplicationCommandDataResolvable = ApplicationCommandData | RESTPostAPIApplicationCommandsJSONBody;

/**
 * Manages API methods for application commands and stores their cache.
 */
export class ApplicationCommandManager<
  ApplicationCommandScope = ApplicationCommand<{ guild: GuildResolvable }>,
  PermissionsOptionsExtras = { guild: GuildResolvable },
  PermissionsGuildType = null,
> extends CachedManager<Snowflake, ApplicationCommandScope, ApplicationCommandResolvable> {
  public constructor(client: Client, iterable?: Iterable<unknown>);

  /**
   * The manager for permissions of arbitrary commands on arbitrary guilds
   */
  public permissions: ApplicationCommandPermissionsManager<
    { command?: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    { command: ApplicationCommandResolvable } & PermissionsOptionsExtras,
    PermissionsOptionsExtras,
    PermissionsGuildType,
    null
  >;

  /**
   * The APIRouter path to the commands
   * @param id The application command's id
   * @param guildId The guild's id to use in the path,
   * ignored when using a {@link GuildApplicationCommandManager}
   */
  private commandPath({ id, guildId }: { id?: Snowflake; guildId?: Snowflake }): unknown;

  /**
   * Creates an application command.
   * @param command The command
   * @param guildId The guild's id to create this command in, ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Create a new command
   * client.application.commands.create({
   *   name: 'test',
   *   description: 'A test command',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public create(command: ApplicationCommandDataResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope>;

  /**
   * Deletes an application command.
   * @param command The command to delete
   * @param guildId The guild's id where the command is registered,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Delete a command
   * guild.commands.delete('123456789012345678')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public delete(command: ApplicationCommandResolvable, guildId?: Snowflake): Promise<ApplicationCommandScope | null>;

  /**
   * Edits an application command.
   * @param command The command to edit
   * @param data The data to update the command with
   * @param guildId The guild's id where the command registered,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Edit an existing command
   * client.application.commands.edit('123456789012345678', {
   *   description: 'New description',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public edit(
    command: ApplicationCommandResolvable,
    data: ApplicationCommandDataResolvable,
  ): Promise<ApplicationCommandScope>;
  public edit(
    command: ApplicationCommandResolvable,
    data: ApplicationCommandDataResolvable,
    guildId: Snowflake,
  ): Promise<ApplicationCommand>;

  /**
   * Obtains one or multiple application commands from Discord, or the cache if it's already available.
   * @param id The application command's id
   * @param  options Additional options for this fetch
   * @example
   * // Fetch a single command
   * client.application.commands.fetch('123456789012345678')
   *   .then(command => console.log(`Fetched command ${command.name}`))
   *   .catch(console.error);
   * @example
   * // Fetch all commands
   * guild.commands.fetch()
   *   .then(commands => console.log(`Fetched ${commands.size} commands`))
   *   .catch(console.error);
   */
  public fetch(
    id: Snowflake,
    options: FetchApplicationCommandOptions & { guildId: Snowflake },
  ): Promise<ApplicationCommand>;
  public fetch(options: FetchApplicationCommandOptions): Promise<Collection<string, ApplicationCommandScope>>;
  public fetch(id: Snowflake, options?: FetchApplicationCommandOptions): Promise<ApplicationCommandScope>;
  public fetch(
    id?: Snowflake,
    options?: FetchApplicationCommandOptions,
  ): Promise<Collection<Snowflake, ApplicationCommandScope>>;

  /**
   * Sets all the commands for this application or guild.
   * @param commands The commands
   * @param guildId The guild's id to create the commands in,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Set all commands to just this one
   * client.application.commands.set([
   *   {
   *     name: 'test',
   *     description: 'A test command',
   *   },
   * ])
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Remove all commands
   * guild.commands.set([])
   *   .then(console.log)
   *   .catch(console.error);
   */
  public set(commands: ApplicationCommandDataResolvable[]): Promise<Collection<Snowflake, ApplicationCommandScope>>;
  public set(
    commands: ApplicationCommandDataResolvable[],
    guildId: Snowflake,
  ): Promise<Collection<Snowflake, ApplicationCommand>>;

  /**
   * Transforms an {@link ApplicationCommandData} object into something that can be used with the API.
   * @param command The command to transform
   */
  private static transformCommand(
    command: ApplicationCommandData,
  ): Omit<APIApplicationCommand, 'id' | 'application_id' | 'guild_id'>;
}

/**
 * Manages API methods for permissions of Application Commands.
 */
export class ApplicationCommandPermissionsManager<
  BaseOptions,
  FetchSingleOptions,
  FullPermissionsOptions,
  GuildType,
  CommandIdType,
> extends BaseManager {
  public constructor(manager: ApplicationCommandManager | GuildApplicationCommandManager | ApplicationCommand);

  /**
   * The manager or command that this manager belongs to
   */
  private manager: ApplicationCommandManager | GuildApplicationCommandManager | ApplicationCommand;

  /**
   * The client that instantiated this Manager
   */
  public client: Client;

  /**
   * The id of the command this manager acts on
   */
  public commandId: CommandIdType;

  /**
   * The guild that this manager acts on
   */
  public guild: GuildType;

  /**
   * The id of the guild that this manager acts on
   */
  public guildId: Snowflake | null;

  /**
   * Add permissions to a command.
   * @param options Options used to add permissions
   * @example
   * // Block a role from the command permissions
   * guild.commands.permissions.add({ command: '123456789012345678', permissions: [
   *   {
   *     id: '876543211234567890',
   *     type: 'ROLE',
   *     permission: false
   *   },
   * ]})
   *   .then(console.log)
   *   .catch(console.error);
   */
  public add(
    options: FetchSingleOptions & { permissions: ApplicationCommandPermissionData[] },
  ): Promise<ApplicationCommandPermissions[]>;

  /**
   * Check whether a permission exists for a user or role
   * @param options Options used to check permissions
   * @example
   * // Check whether a user has permission to use a command
   * guild.commands.permissions.has({ command: '123456789012345678', permissionId: '876543210123456789' })
   *  .then(console.log)
   *  .catch(console.error);
   */
  public has(options: FetchSingleOptions & { permissionId: UserResolvable | RoleResolvable }): Promise<boolean>;

  /**
   * Fetches the permissions for one or multiple commands.
   * @param options Options used to fetch permissions
   * @example
   * // Fetch permissions for one command
   * guild.commands.permissions.fetch({ command: '123456789012345678' })
   *   .then(perms => console.log(`Fetched permissions for ${perms.length} users`))
   *   .catch(console.error);
   * @example
   * // Fetch permissions for all commands in a guild
   * client.application.commands.permissions.fetch({ guild: '123456789012345678' })
   *   .then(perms => console.log(`Fetched permissions for ${perms.size} commands`))
   *   .catch(console.error);
   */
  public fetch(options: FetchSingleOptions): Promise<ApplicationCommandPermissions[]>;
  public fetch(options: BaseOptions): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;

  /**
   * Remove permissions from a command.
   * @param options Options used to remove permissions
   * @example
   * // Remove a user permission from this command
   * guild.commands.permissions.remove({ command: '123456789012345678', users: '876543210123456789' })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Remove multiple roles from this command
   * guild.commands.permissions.remove({
   *   command: '123456789012345678', roles: ['876543210123456789', '765432101234567890']
   * })
   *    .then(console.log)
   *    .catch(console.error);
   */
  public remove(
    options:
      | (FetchSingleOptions & {
          users: UserResolvable | UserResolvable[];
          roles?: RoleResolvable | RoleResolvable[];
        })
      | (FetchSingleOptions & {
          users?: UserResolvable | UserResolvable[];
          roles: RoleResolvable | RoleResolvable[];
        }),
  ): Promise<ApplicationCommandPermissions[]>;

  /**
   * Sets the permissions for one or more commands.
   * @param options Options used to set permissions
   * @example
   * // Set the permissions for one command
   * client.application.commands.permissions.set({ guild: '892455839386304532', command: '123456789012345678',
   *  permissions: [
   *    {
   *      id: '876543210987654321',
   *      type: 'USER',
   *      permission: false,
   *    },
   * ]})
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Set the permissions for all commands
   * guild.commands.permissions.set({ fullPermissions: [
   *   {
   *     id: '123456789012345678',
   *     permissions: [{
   *       id: '876543210987654321',
   *       type: 'USER',
   *       permission: false,
   *     }],
   *   },
   * ]})
   *   .then(console.log)
   *   .catch(console.error);
   */
  public set(
    options: FetchSingleOptions & { permissions: ApplicationCommandPermissionData[] },
  ): Promise<ApplicationCommandPermissions[]>;
  public set(
    options: FullPermissionsOptions & {
      fullPermissions: GuildApplicationCommandPermissionData[];
    },
  ): Promise<Collection<Snowflake, ApplicationCommandPermissions[]>>;

  /**
   * The APIRouter path to the commands
   * @param guildId The guild's id to use in the path,
   * @param commandId The application command's id
   */
  private permissionsPath(guildId: Snowflake, commandId?: Snowflake): unknown;

  /**
   * Transforms an {@link ApplicationCommandPermissionData} object into something that can be used with the API.
   * @param permissions The permissions to transform
   * @param received Whether these permissions have been received from Discord
   */
  private static transformPermissions(
    permissions: ApplicationCommandPermissionData,
    received: true,
  ): Omit<APIApplicationCommandPermission, 'type'> & { type: keyof ApplicationCommandPermissionTypes };
  private static transformPermissions(permissions: ApplicationCommandPermissionData): APIApplicationCommandPermission;
}

/**
 * Holds methods to resolve GuildEmojis and stores their cache.
 */
export class BaseGuildEmojiManager extends CachedManager<Snowflake, GuildEmoji, EmojiResolvable> {
  public constructor(client: Client, iterable?: Iterable<RawGuildEmojiData>);

  /**
   * Resolves an EmojiResolvable to an emoji identifier.
   * @param emoji The emoji resolvable to resolve
   */
  public resolveIdentifier(emoji: EmojiIdentifierResolvable): string | null;
}

/**
 * A manager of channels belonging to a client
 */
export class ChannelManager extends CachedManager<Snowflake, AnyChannel, ChannelResolvable> {
  private constructor(client: Client, iterable: Iterable<RawChannelData>);

  /**
   * Obtains a channel from Discord, or the channel cache if it's already available.
   * @param id The channel's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch a channel by its id
   * client.channels.fetch('222109930545610754')
   *   .then(channel => console.log(channel.name))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: FetchChannelOptions): Promise<AnyChannel | null>;
}

/**
 * An extension for guild-specific application commands.
 */
export class GuildApplicationCommandManager extends ApplicationCommandManager<ApplicationCommand, {}, Guild> {
  public constructor(guild: Guild, iterable?: Iterable<RawApplicationCommandData>);

  /**
   * The guild that this manager belongs to
   */
  public guild: Guild;

  /**
   * Creates an application command.
   * @param command The command
   * @param guildId The guild's id to create this command in,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Create a new command
   * client.application.commands.create({
   *   name: 'test',
   *   description: 'A test command',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public create(command: ApplicationCommandDataResolvable): Promise<ApplicationCommand>;

  /**
   * Deletes an application command.
   * @param command The command to delete
   * @param guildId The guild's id where the command is registered,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Delete a command
   * guild.commands.delete('123456789012345678')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public delete(command: ApplicationCommandResolvable): Promise<ApplicationCommand | null>;

  /**
   * Edits an application command.
   * @param command The command to edit
   * @param data The data to update the command with
   * @param guildId The guild's id where the command registered,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Edit an existing command
   * client.application.commands.edit('123456789012345678', {
   *   description: 'New description',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public edit(
    command: ApplicationCommandResolvable,
    data: ApplicationCommandDataResolvable,
  ): Promise<ApplicationCommand>;

  /**
   * Obtains one or multiple application commands from Discord, or the cache if it's already available.
   * @param id The application command's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch a single command
   * client.application.commands.fetch('123456789012345678')
   *   .then(command => console.log(`Fetched command ${command.name}`))
   *   .catch(console.error);
   * @example
   * // Fetch all commands
   * guild.commands.fetch()
   *   .then(commands => console.log(`Fetched ${commands.size} commands`))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<ApplicationCommand>;
  public fetch(options: BaseFetchOptions): Promise<Collection<Snowflake, ApplicationCommand>>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, ApplicationCommand>>;

  /**
   * Sets all the commands for this application or guild.
   * @param commands The commands
   * @param guildId The guild's id to create the commands in,
   * ignored when using a {@link GuildApplicationCommandManager}
   * @example
   * // Set all commands to just this one
   * client.application.commands.set([
   *   {
   *     name: 'test',
   *     description: 'A test command',
   *   },
   * ])
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Remove all commands
   * guild.commands.set([])
   *   .then(console.log)
   *   .catch(console.error);
   */
  public set(commands: ApplicationCommandDataResolvable[]): Promise<Collection<Snowflake, ApplicationCommand>>;
}

export type MappedGuildChannelTypes = EnumValueMapped<
  typeof ChannelTypes,
  {
    GUILD_CATEGORY: CategoryChannel;
  }
> &
  MappedChannelCategoryTypes;

export type GuildChannelTypes = CategoryChannelTypes | ChannelTypes.GUILD_CATEGORY | 'GUILD_CATEGORY';

/**
 * Manages API methods for GuildChannels and stores their cache.
 */
export class GuildChannelManager extends CachedManager<Snowflake, GuildBasedChannel, GuildChannelResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawGuildChannelData>);

  /**
   * The number of channels in this managers cache excluding thread channels
   * that do not count towards a guild's maximum channels restriction.
   */
  public readonly channelCountWithoutThreads: number;

  /**
   * The guild this Manager belongs to
   */
  public guild: Guild;

  /**
   * Creates a new channel in the guild.
   * @param name The name of the new channel
   * @param options Options for creating the new channel
   * @example
   * // Create a new text channel
   * guild.channels.create('new-general', { reason: 'Needed a cool new channel' })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Create a new channel with permission overwrites
   * guild.channels.create('new-voice', {
   *   type: 'GUILD_VOICE',
   *   permissionOverwrites: [
   *      {
   *        id: message.author.id,
   *        deny: [Permissions.FLAGS.VIEW_CHANNEL],
   *     },
   *   ],
   * })
   * @deprecated See [Self-serve Game Selling Deprecation](https://support-dev.discord.com/hc/en-us/articles/4414590563479) for more information
   */
  public create(name: string, options: GuildChannelCreateOptions & { type: 'GUILD_STORE' }): Promise<StoreChannel>;
  /**
   * Creates a new channel in the guild.
   * @param name The name of the new channel
   * @param options Options for creating the new channel
   */
  public create<T extends GuildChannelTypes>(
    name: string,
    options: GuildChannelCreateOptions & { type: T },
  ): Promise<MappedGuildChannelTypes[T]>;

  /**
   * Creates a new channel in the guild.
   * @param name The name of the new channel
   * @param options Options for creating the new channel
   */
  public create(name: string, options: GuildChannelCreateOptions): Promise<NonThreadGuildBasedChannel>;

  /**
   * Obtains one or more guild channels from Discord, or the channel cache if they're already available.
   * @param id The channel's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch all channels from the guild (excluding threads)
   * message.guild.channels.fetch()
   *   .then(channels => console.log(`There are ${channels.size} channels.`))
   *   .catch(console.error);
   * @example
   * // Fetch a single channel
   * message.guild.channels.fetch('222197033908436994')
   *   .then(channel => console.log(`The channel name is: ${channel.name}`))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<NonThreadGuildBasedChannel | null>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, NonThreadGuildBasedChannel>>;

  /**
   * Batch-updates the guild's channels' positions.
   * <info>Only one channel's parent can be changed at a time</info>
   * @param channelPositions Channel positions to update
   * @example
   * guild.channels.setPositions([{ channel: channelId, position: newChannelIndex }])
   *   .then(guild => console.log(`Updated channel positions for ${guild}`))
   *   .catch(console.error);
   */
  public setPositions(channelPositions: readonly ChannelPosition[]): Promise<Guild>;

  /**
   * Obtains all active thread channels in the guild from Discord
   * @param cache Whether to cache the fetched data
   * @example
   * // Fetch all threads from the guild
   * message.guild.channels.fetchActiveThreads()
   *   .then(fetched => console.log(`There are ${fetched.threads.size} threads.`))
   *   .catch(console.error);
   */
  public fetchActiveThreads(cache?: boolean): Promise<FetchedThreads>;
}

/**
 * Manages API methods for GuildEmojis and stores their cache.
 */
export class GuildEmojiManager extends BaseGuildEmojiManager {
  public constructor(guild: Guild, iterable?: Iterable<RawGuildEmojiData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Creates a new custom emoji in the guild.
   * @param attachment The image for the emoji
   * @param name The name for the emoji
   * @param options Options for creating the emoji
   * @returns The created emoji
   * @example
   * // Create a new emoji from a URL
   * guild.emojis.create('https://i.imgur.com/w3duR07.png', 'rip')
   *   .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
   *   .catch(console.error);
   * @example
   * // Create a new emoji from a file on your computer
   * guild.emojis.create('./memes/banana.png', 'banana')
   *   .then(emoji => console.log(`Created new emoji with name ${emoji.name}!`))
   *   .catch(console.error);
   */
  public create(
    attachment: BufferResolvable | Base64Resolvable,
    name: string,
    options?: GuildEmojiCreateOptions,
  ): Promise<GuildEmoji>;

  /**
   * Obtains one or more emojis from Discord, or the emoji cache if they're already available.
   * @param id The emoji's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch all emojis from the guild
   * message.guild.emojis.fetch()
   *   .then(emojis => console.log(`There are ${emojis.size} emojis.`))
   *   .catch(console.error);
   * @example
   * // Fetch a single emoji
   * message.guild.emojis.fetch('222078108977594368')
   *   .then(emoji => console.log(`The emoji name is: ${emoji.name}`))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<GuildEmoji>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, GuildEmoji>>;
}

/**
 * Manages API methods for roles belonging to emojis and stores their cache.
 */
export class GuildEmojiRoleManager extends DataManager<Snowflake, Role, RoleResolvable> {
  public constructor(emoji: GuildEmoji);

  /**
   * The emoji belonging to this manager
   */
  public emoji: GuildEmoji;

  /**
   * The guild belonging to this manager
   */
  public guild: Guild;

  /**
   * Adds a role (or multiple roles) to the list of roles that can use this emoji.
   * @param roleOrRoles The role or roles to add
   */
  public add(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
  ): Promise<GuildEmoji>;

  /**
   * Sets the role(s) that can use this emoji.
   * @param roles The roles or role ids to apply
   * @example
   * // Set the emoji's roles to a single role
   * guildEmoji.roles.set(['391156570408615936'])
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Remove all roles from an emoji
   * guildEmoji.roles.set([])
   *    .then(console.log)
   *    .catch(console.error);
   */
  public set(roles: readonly RoleResolvable[] | Collection<Snowflake, Role>): Promise<GuildEmoji>;

  /**
   * Removes a role (or multiple roles) from the list of roles that can use this emoji.
   * @param roleOrRoles The role or roles to remove
   */
  public remove(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
  ): Promise<GuildEmoji>;
}

/**
 * Manages API methods for Guilds and stores their cache.
 */
export class GuildManager extends CachedManager<Snowflake, Guild, GuildResolvable> {
  public constructor(client: Client, iterable?: Iterable<RawGuildData>);

  /**
   * Creates a guild.
   * <warn>This is only available to bots in fewer than 10 guilds.</warn>
   * @param name The name of the guild
   * @param options Options for creating the guild
   * @returns The guild that was created
   */
  public create(name: string, options?: GuildCreateOptions): Promise<Guild>;

  /**
   * Obtains one or multiple guilds from Discord, or the guild cache if it's already available.
   * @param options The guild's id or options
   */
  public fetch(options: Snowflake | FetchGuildOptions): Promise<Guild>;
  public fetch(options?: FetchGuildsOptions): Promise<Collection<Snowflake, OAuth2Guild>>;
}

/**
 * Manages API methods for GuildMembers and stores their cache.
 */
export class GuildMemberManager extends CachedManager<Snowflake, GuildMember, GuildMemberResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawGuildMemberData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Adds a user to the guild using OAuth2. Requires the `CREATE_INSTANT_INVITE` permission.
   * @param user The user to add to the guild
   * @param options Options for adding the user to the guild
   */
  public add(
    user: UserResolvable,
    options: AddGuildMemberOptions & { fetchWhenExisting: false },
  ): Promise<GuildMember | null>;
  public add(user: UserResolvable, options: AddGuildMemberOptions): Promise<GuildMember>;

  /**
   * Bans a user from the guild.
   * @param user The user to ban
   * @param options Options for the ban
   * @returns Result object will be resolved as specifically as possible.
   * If the GuildMember cannot be resolved, the User will instead be attempted to be resolved. If that also cannot
   * be resolved, the user id will be the result.
   * Internally calls the GuildBanManager#create method.
   * @example
   * // Ban a user by id (or with a user/guild member object)
   * guild.members.ban('84484653687267328')
   *   .then(kickInfo => console.log(`Banned ${kickInfo.user?.tag ?? kickInfo.tag ?? kickInfo}`))
   *   .catch(console.error);
   */
  public ban(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;

  /**
   * Edits a member of the guild.
   * <info>The user must be a member of the guild</info>
   * @param user The member to edit
   * @param data The data to edit the member with
   * @param reason Reason for editing this user
   */
  public edit(user: UserResolvable, data: GuildMemberEditData, reason?: string): Promise<void>;

  /**
   * Fetches member(s) from Discord, even if they're offline.
   * @param options If a UserResolvable, the user to fetch.
   * If undefined, fetches all members.
   * If a query, it limits the results to users with similar usernames.
   * @example
   * // Fetch all members from a guild
   * guild.members.fetch()
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single member
   * guild.members.fetch('66564597481480192')
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single member without checking cache
   * guild.members.fetch({ user, force: true })
   *   .then(console.log)
   *   .catch(console.error)
   * @example
   * // Fetch a single member without caching
   * guild.members.fetch({ user, cache: false })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch by an array of users including their presences
   * guild.members.fetch({ user: ['66564597481480192', '191615925336670208'], withPresences: true })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch by query
   * guild.members.fetch({ query: 'hydra', limit: 1 })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public fetch(
    options: UserResolvable | FetchMemberOptions | (FetchMembersOptions & { user: UserResolvable }),
  ): Promise<GuildMember>;
  public fetch(options?: FetchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;

  /**
   * Kicks a user from the guild.
   * <info>The user must be a member of the guild</info>
   * @param user The member to kick
   * @param reason Reason for kicking
   * @returns Result object will be resolved as specifically as possible.
   * If the GuildMember cannot be resolved, the User will instead be attempted to be resolved. If that also cannot
   * be resolved, the user's id will be the result.
   * @example
   * // Kick a user by id (or with a user/guild member object)
   * guild.members.kick('84484653687267328')
   *   .then(banInfo => console.log(`Kicked ${banInfo.user?.tag ?? banInfo.tag ?? banInfo}`))
   *   .catch(console.error);
   */
  public kick(user: UserResolvable, reason?: string): Promise<GuildMember | User | Snowflake>;

  /**
   * Lists up to 1000 members of the guild.
   * @param options Options for listing members
   */
  public list(options?: GuildListMembersOptions): Promise<Collection<Snowflake, GuildMember>>;

  /**
   * Prunes members from the guild based on how long they have been inactive.
   * @param options Options for pruning
   * @returns The number of members that were/will be kicked
   * @example
   * // See how many members will be pruned
   * guild.members.prune({ dry: true })
   *   .then(pruned => console.log(`This will prune ${pruned} people!`))
   *   .catch(console.error);
   * @example
   * // Actually prune the members
   * guild.members.prune({ days: 1, reason: 'too many people!' })
   *   .then(pruned => console.log(`I just pruned ${pruned} people!`))
   *   .catch(console.error);
   * @example
   * // Include members with a specified role
   * guild.members.prune({ days: 7, roles: ['657259391652855808'] })
   *    .then(pruned => console.log(`I just pruned ${pruned} people!`))
   *    .catch(console.error);
   */
  public prune(options: GuildPruneMembersOptions & { dry?: false; count: false }): Promise<null>;
  public prune(options?: GuildPruneMembersOptions): Promise<number>;

  /**
   * Searches for members in the guild based on a query.
   * @param options Options for searching members
   */
  public search(options: GuildSearchMembersOptions): Promise<Collection<Snowflake, GuildMember>>;

  /**
   * Unbans a user from the guild. Internally calls the {@link GuildBanManager.remove} method.
   * @param user The user to unban
   * @param reason Reason for unbanning user
   * @returns The user that was unbanned
   * @example
   * // Unban a user by id (or with a user/guild member object)
   * guild.members.unban('84484653687267328')
   *   .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
   *   .catch(console.error);
   */
  public unban(user: UserResolvable, reason?: string): Promise<User>;
}

/**
 * Manages API methods for GuildBans and stores their cache.
 */
export class GuildBanManager extends CachedManager<Snowflake, GuildBan, GuildBanResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawGuildBanData>);

  /**
   * The guild this Manager belongs to
   */
  public guild: Guild;

  /**
   * Bans a user from the guild.
   * @param user The user to ban
   * @param options Options for the ban
   * @returns Result object will be resolved as specifically as possible.
   * If the GuildMember cannot be resolved, the User will instead be attempted to be resolved. If that also cannot
   * be resolved, the user id will be the result.
   * @example
   * // Ban a user by id (or with a user/guild member object)
   * guild.bans.create('84484653687267328')
   *   .then(banInfo => console.log(`Banned ${banInfo.user?.tag ?? banInfo.tag ?? banInfo}`))
   *   .catch(console.error);
   */
  public create(user: UserResolvable, options?: BanOptions): Promise<GuildMember | User | Snowflake>;

  /**
   * Fetches ban(s) from Discord.
   * @param options Options for fetching guild ban(s)
   * @example
   * // Fetch all bans from a guild
   * guild.bans.fetch()
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch all bans from a guild without caching
   * guild.bans.fetch({ cache: false })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single ban
   * guild.bans.fetch('351871113346809860')
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single ban without checking cache
   * guild.bans.fetch({ user, force: true })
   *   .then(console.log)
   *   .catch(console.error)
   * @example
   * // Fetch a single ban without caching
   * guild.bans.fetch({ user, cache: false })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public fetch(options: UserResolvable | FetchBanOptions): Promise<GuildBan>;
  public fetch(options?: FetchBansOptions): Promise<Collection<Snowflake, GuildBan>>;

  /**
   * Unbans a user from the guild.
   * @param user The user to unban
   * @param reason Reason for unbanning user
   * @example
   * // Unban a user by id (or with a user/guild member object)
   * guild.bans.remove('84484653687267328')
   *   .then(user => console.log(`Unbanned ${user.username} from ${guild.name}`))
   *   .catch(console.error);
   */
  public remove(user: UserResolvable, reason?: string): Promise<User | null>;
}

/**
 * Manages API methods for GuildInvites and stores their cache.
 */
export class GuildInviteManager extends DataManager<string, Invite, InviteResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawInviteData>);

  /**
   * The guild this Manager belongs to
   */
  public guild: Guild;

  /**
   * Create an invite to the guild from the provided channel.
   * @param channel The options for creating the invite from a channel.
   * @param options The options for creating the invite from a channel.
   * @example
   * // Create an invite to a selected channel
   * guild.invites.create('599942732013764608')
   *   .then(console.log)
   *   .catch(console.error);
   */
  public create(channel: GuildInvitableChannelResolvable, options?: CreateInviteOptions): Promise<Invite>;

  /**
   * Fetches invite(s) from Discord.
   * @param options Options for fetching guild invite(s)
   * @example
   * // Fetch all invites from a guild
   * guild.invites.fetch()
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch all invites from a guild without caching
   * guild.invites.fetch({ cache: false })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch all invites from a channel
   * guild.invites.fetch({ channelId: '222197033908436994' })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single invite
   * guild.invites.fetch('bRCvFy9')
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Fetch a single invite without checking cache
   * guild.invites.fetch({ code: 'bRCvFy9', force: true })
   *   .then(console.log)
   *   .catch(console.error)
   * @example
   * // Fetch a single invite without caching
   * guild.invites.fetch({ code: 'bRCvFy9', cache: false })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public fetch(options: InviteResolvable | FetchInviteOptions): Promise<Invite>;
  public fetch(options?: FetchInvitesOptions): Promise<Collection<string, Invite>>;

  /**
   * Deletes an invite.
   * @param invite The invite to delete
   * @param reason Reason for deleting the invite
   */
  public delete(invite: InviteResolvable, reason?: string): Promise<Invite>;
}

/**
 * Manages API methods for GuildScheduledEvents and stores their cache.
 */
export class GuildScheduledEventManager extends CachedManager<
  Snowflake,
  GuildScheduledEvent,
  GuildScheduledEventResolvable
> {
  private constructor(guild: Guild, iterable?: Iterable<RawGuildScheduledEventData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Creates a new guild scheduled event.
   * @param options Options for creating the guild scheduled event
   */
  public create(options: GuildScheduledEventCreateOptions): Promise<GuildScheduledEvent>;

  /**
   * Obtains one or more guild scheduled events from Discord, or the guild cache if it's already available.
   * @param options The id of the guild scheduled event or options
   */
  public fetch(): Promise<Collection<Snowflake, GuildScheduledEvent>>;
  public fetch<
    T extends GuildScheduledEventResolvable | FetchGuildScheduledEventOptions | FetchGuildScheduledEventsOptions,
  >(options?: T): Promise<GuildScheduledEventManagerFetchResult<T>>;

  /**
   * Edits a guild scheduled event.
   * @param guildScheduledEvent The guild scheduled event to edit
   * @param options Options to edit the guild scheduled event
   */
  public edit<S extends GuildScheduledEventStatus, T extends GuildScheduledEventSetStatusArg<S>>(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options: GuildScheduledEventEditOptions<S, T>,
  ): Promise<GuildScheduledEvent<T>>;

  /**
   * Deletes a guild scheduled event.
   * @param guildScheduledEvent The guild scheduled event to delete
   */
  public delete(guildScheduledEvent: GuildScheduledEventResolvable): Promise<void>;

  /**
   * Fetches subscribers of a guild scheduled event.
   * @param guildScheduledEvent The guild scheduled event to fetch subscribers of
   * @param options Options for fetching the subscribers
   */
  public fetchSubscribers<T extends FetchGuildScheduledEventSubscribersOptions>(
    guildScheduledEvent: GuildScheduledEventResolvable,
    options?: T,
  ): Promise<GuildScheduledEventManagerFetchSubscribersResult<T>>;
}

/**
 * Manages API methods for Guild Stickers and stores their cache.
 */
export class GuildStickerManager extends CachedManager<Snowflake, Sticker, StickerResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawStickerData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Creates a new custom sticker in the guild.
   * @param file The file for the sticker
   * @param name The name for the sticker
   * @param tags The Discord name of a unicode emoji representing the sticker's expression
   * @param options Options
   * @returns The created sticker
   * @example
   * // Create a new sticker from a URL
   * guild.stickers.create('https://i.imgur.com/w3duR07.png', 'rip', 'headstone')
   *   .then(sticker => console.log(`Created new sticker with name ${sticker.name}!`))
   *   .catch(console.error);
   * @example
   * // Create a new sticker from a file on your computer
   * guild.stickers.create('./memes/banana.png', 'banana', 'banana')
   *   .then(sticker => console.log(`Created new sticker with name ${sticker.name}!`))
   *   .catch(console.error);
   */
  public create(
    file: BufferResolvable | Stream | FileOptions | MessageAttachment,
    name: string,
    tags: string,
    options?: GuildStickerCreateOptions,
  ): Promise<Sticker>;

  /**
   * Edits a sticker.
   * @param sticker The sticker to edit
   * @param data The new data for the sticker
   * @param reason Reason for editing this sticker
   */
  public edit(sticker: StickerResolvable, data?: GuildStickerEditData, reason?: string): Promise<Sticker>;

  /**
   * Deletes a sticker.
   * @param sticker The sticker to delete
   * @param reason Reason for deleting this sticker
   */
  public delete(sticker: StickerResolvable, reason?: string): Promise<void>;

  /**
   * Obtains one or more stickers from Discord, or the sticker cache if they're already available.
   * @param id The Sticker's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch all stickers from the guild
   * message.guild.stickers.fetch()
   *   .then(stickers => console.log(`There are ${stickers.size} stickers.`))
   *   .catch(console.error);
   * @example
   * // Fetch a single sticker
   * message.guild.stickers.fetch('222078108977594368')
   *   .then(sticker => console.log(`The sticker name is: ${sticker.name}`))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Sticker>;
  public fetch(id?: Snowflake, options?: BaseFetchOptions): Promise<Collection<Snowflake, Sticker>>;
}

/**
 * Manages API methods for roles of a GuildMember and stores their cache.
 */
export class GuildMemberRoleManager extends DataManager<Snowflake, Role, RoleResolvable> {
  public constructor(member: GuildMember);

  /**
   * The role of the member used to hoist them in a separate category in the users list
   */
  public readonly hoist: Role | null;

  /**
   * The role of the member used to set their role icon
   */
  public readonly icon: Role | null;

  /**
   * The role of the member used to set their color
   */
  public readonly color: Role | null;

  /**
   * The role of the member with the highest position
   */
  public readonly highest: Role;

  /**
   * The premium subscriber role of the guild, if present on the member
   */
  public readonly premiumSubscriberRole: Role | null;

  /**
   * The managed role this member created when joining the guild, if any
   * <info>Only ever available on bots</info>
   */
  public readonly botRole: Role | null;

  /**
   * The GuildMember this manager belongs to
   */
  public member: GuildMember;

  /**
   * The Guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Adds a role (or multiple roles) to the member.
   * @param roleOrRoles The role or roles to add
   * @param reason Reason for adding the role(s)
   */
  public add(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
    reason?: string,
  ): Promise<GuildMember>;

  /**
   * Sets the roles applied to the member.
   * @param roles The roles or role ids to apply
   * @param reason Reason for applying the roles
   * @example
   * // Set the member's roles to a single role
   * guildMember.roles.set(['391156570408615936'])
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Remove all the roles from a member
   * guildMember.roles.set([])
   *   .then(member => console.log(`Member roles is now of ${member.roles.cache.size} size`))
   *   .catch(console.error);
   */
  public set(roles: readonly RoleResolvable[] | Collection<Snowflake, Role>, reason?: string): Promise<GuildMember>;

  /**
   * Removes a role (or multiple roles) from the member.
   * @param roleOrRoles The role or roles to remove
   * @param reason Reason for removing the role(s)
   */
  public remove(
    roleOrRoles: RoleResolvable | readonly RoleResolvable[] | Collection<Snowflake, Role>,
    reason?: string,
  ): Promise<GuildMember>;
}

/**
 * Manages API methods for Messages and holds their cache.
 */
export class MessageManager extends CachedManager<Snowflake, Message, MessageResolvable> {
  public constructor(channel: TextBasedChannel, iterable?: Iterable<RawMessageData>);

  /**
   * The channel that the messages belong to
   */
  public channel: TextBasedChannel;

  /**
   * The cache of Messages
   */
  public cache: Collection<Snowflake, Message>;

  /**
   * Publishes a message in an announcement channel to all channels following it, even if it's not cached.
   * @param message The message to publish
   */
  public crosspost(message: MessageResolvable): Promise<Message>;

  /**
   * Deletes a message, even if it's not cached.
   * @param message The message to delete
   */
  public delete(message: MessageResolvable): Promise<void>;

  /**
   * Edits a message, even if it's not cached.
   * @param message The message to edit
   * @param options The options to edit the message
   */
  public edit(message: MessageResolvable, options: string | MessagePayload | MessageEditOptions): Promise<Message>;

  /**
   * Gets a message, or messages, from this channel.
   * <info>The returned Collection does not contain reaction users of the messages if they were not cached.
   * Those need to be fetched separately in such a case.</info>
   * @param message The id of the message to fetch, or query parameters.
   * @param options Additional options for this fetch
   * @example
   * // Get message
   * channel.messages.fetch('99539446449315840')
   *   .then(message => console.log(message.content))
   *   .catch(console.error);
   * @example
   * // Get messages
   * channel.messages.fetch({ limit: 10 })
   *   .then(messages => console.log(`Received ${messages.size} messages`))
   *   .catch(console.error);
   * @example
   * // Get messages and filter by user id
   * channel.messages.fetch()
   *   .then(messages => console.log(`${messages.filter(m => m.author.id === '84484653687267328').size} messages`))
   *   .catch(console.error);
   */
  public fetch(message: Snowflake, options?: BaseFetchOptions): Promise<Message>;
  public fetch(
    options?: ChannelLogsQueryOptions,
    cacheOptions?: BaseFetchOptions,
  ): Promise<Collection<Snowflake, Message>>;

  /**
   * Fetches the pinned messages of this channel and returns a collection of them.
   * <info>The returned Collection does not contain any reaction data of the messages.
   * Those need to be fetched separately.</info>
   * @param cache Whether to cache the message(s)
   * @example
   * // Get pinned messages
   * channel.messages.fetchPinned()
   *   .then(messages => console.log(`Received ${messages.size} messages`))
   *   .catch(console.error);
   */
  public fetchPinned(cache?: boolean): Promise<Collection<Snowflake, Message>>;

  /**
   * Adds a reaction to a message, even if it's not cached.
   * @param message The message to react to
   * @param emoji The emoji to react with
   */
  public react(message: MessageResolvable, emoji: EmojiIdentifierResolvable): Promise<void>;

  /**
   * Pins a message to the channel's pinned messages, even if it's not cached.
   * @param message The message to pin
   */
  public pin(message: MessageResolvable): Promise<void>;

  /**
   * Unpins a message from the channel's pinned messages, even if it's not cached.
   * @param message The message to unpin
   */
  public unpin(message: MessageResolvable): Promise<void>;
}

/**
 * Manages API methods for guild channel permission overwrites and stores their cache.
 */
export class PermissionOverwriteManager extends CachedManager<
  Snowflake,
  PermissionOverwrites,
  PermissionOverwriteResolvable
> {
  public constructor(client: Client, iterable?: Iterable<RawPermissionOverwriteData>);

  /**
   * Replaces the permission overwrites in this channel.
   * @param overwrites Permission overwrites the channel gets updated with
   * @param reason Reason for updating the channel overwrites
   * @example
   * message.channel.permissionOverwrites.set([
   *   {
   *      id: message.author.id,
   *      deny: [Permissions.FLAGS.VIEW_CHANNEL],
   *   },
   * ], 'Needed to change permissions');
   */
  public set(
    overwrites: readonly OverwriteResolvable[] | Collection<Snowflake, OverwriteResolvable>,
    reason?: string,
  ): Promise<NonThreadGuildBasedChannel>;

  /**
   * Creates or edits permission overwrites for a user or role in this channel.
   * @param userOrRole The user or role to update
   * @param options The options for the update
   * @param overwriteOptions The extra information for the update
   * @param existing The existing overwrites to merge with this update
   * @private
   */
  private upsert(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
    existing?: PermissionOverwrites,
  ): Promise<NonThreadGuildBasedChannel>;

  /**
   * Creates permission overwrites for a user or role in this channel, or replaces them if already present.
   * @param userOrRole The user or role to update
   * @param options The options for the update
   * @param overwriteOptions The extra information for the update
   * @example
   * // Create or Replace permission overwrites for a message author
   * message.channel.permissionOverwrites.create(message.author, {
   *   SEND_MESSAGES: false
   * })
   *   .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
   *   .catch(console.error);
   */
  public create(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
  ): Promise<NonThreadGuildBasedChannel>;

  /**
   * Edits permission overwrites for a user or role in this channel, or creates an entry if not already present.
   * @param userOrRole The user or role to update
   * @param options The options for the update
   * @param overwriteOptions The extra information for the update
   * @example
   * // Edit or Create permission overwrites for a message author
   * message.channel.permissionOverwrites.edit(message.author, {
   *   SEND_MESSAGES: false
   * })
   *   .then(channel => console.log(channel.permissionOverwrites.cache.get(message.author.id)))
   *   .catch(console.error);
   */
  public edit(
    userOrRole: RoleResolvable | UserResolvable,
    options: PermissionOverwriteOptions,
    overwriteOptions?: GuildChannelOverwriteOptions,
  ): Promise<NonThreadGuildBasedChannel>;

  /**
   * Deletes permission overwrites for a user or role in this channel.
   * @param userOrRole The user or role to delete
   * @param reason The reason for deleting the overwrite
   */
  public delete(userOrRole: RoleResolvable | UserResolvable, reason?: string): Promise<NonThreadGuildBasedChannel>;
}

/**
 * Manages API methods for Presences and holds their cache.
 */
export class PresenceManager extends CachedManager<Snowflake, Presence, PresenceResolvable> {
  public constructor(client: Client, iterable?: Iterable<RawPresenceData>);
}

/**
 * Manages API methods for reactions and holds their cache.
 */
export class ReactionManager extends CachedManager<Snowflake | string, MessageReaction, MessageReactionResolvable> {
  public constructor(message: Message, iterable?: Iterable<RawMessageReactionData>);

  /**
   * The message that this manager belongs to
   */
  public message: Message;

  /**
   * Removes all reactions from a message.
   */
  public removeAll(): Promise<Message>;
}

/**
 * Manages API methods for users who reacted to a reaction and stores their cache.
 */
export class ReactionUserManager extends CachedManager<Snowflake, User, UserResolvable> {
  public constructor(reaction: MessageReaction, iterable?: Iterable<RawUserData>);

  /**
   * The reaction that this manager belongs to
   */
  public reaction: MessageReaction;

  /**
   * Fetches all the users that gave this reaction. Resolves with a collection of users, mapped by their ids.
   * @param options Options for fetching the users
   */
  public fetch(options?: FetchReactionUsersOptions): Promise<Collection<Snowflake, User>>;

  /**
   * Removes a user from this reaction.
   * @param user The user to remove the reaction of
   */
  public remove(user?: UserResolvable): Promise<MessageReaction>;
}

/**
 * Manages API methods for roles and stores their cache.
 */
export class RoleManager extends CachedManager<Snowflake, Role, RoleResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawRoleData>);

  /**
   * The `@everyone` role of the guild
   */
  public readonly everyone: Role;

  /**
   * The role with the highest position in the cache
   */
  public readonly highest: Role;

  /**
   * The guild belonging to this manager
   */
  public guild: Guild;

  /**
   * The premium subscriber role of the guild, if any
   */
  public readonly premiumSubscriberRole: Role | null;

  /**
   * Gets the managed role a user created when joining the guild, if any
   * <info>Only ever available for bots</info>
   * @param user The user to access the bot role for
   */
  public botRoleFor(user: UserResolvable): Role | null;

  /**
   * Obtains a role from Discord, or the role cache if they're already available.
   * @param id The role's id
   * @param options Additional options for this fetch
   * @example
   * // Fetch all roles from the guild
   * message.guild.roles.fetch()
   *   .then(roles => console.log(`There are ${roles.size} roles.`))
   *   .catch(console.error);
   * @example
   * // Fetch a single role
   * message.guild.roles.fetch('222078108977594368')
   *   .then(role => console.log(`The role color is: ${role.color}`))
   *   .catch(console.error);
   */
  public fetch(id: Snowflake, options?: BaseFetchOptions): Promise<Role | null>;
  public fetch(id?: undefined, options?: BaseFetchOptions): Promise<Collection<Snowflake, Role>>;

  /**
   * Creates a new role in the guild with given information.
   * <warn>The position will silently reset to 1 if an invalid one is provided, or none.</warn>
   * @param options Options for creating the new role
   * @example
   * // Create a new role
   * guild.roles.create()
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Create a new role with data and a reason
   * guild.roles.create({
   *   name: 'Super Cool Blue People',
   *   color: 'BLUE',
   *   reason: 'we needed a role for Super Cool People',
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  public create(options?: CreateRoleOptions): Promise<Role>;

  /**
   * Edits a role of the guild.
   * @param role The role to edit
   * @param data The new data for the role
   * @param reason Reason for editing this role
   * @example
   * // Edit a role
   * guild.roles.edit('222079219327434752', { name: 'buddies' })
   *   .then(updated => console.log(`Edited role name to ${updated.name}`))
   *   .catch(console.error);
   */
  public edit(role: RoleResolvable, options: RoleData, reason?: string): Promise<Role>;

  /**
   * Deletes a role.
   * @param role The role to delete
   * @param reason Reason for deleting the role
   * @example
   * // Delete a role
   * guild.roles.delete('222079219327434752', 'The role needed to go')
   *   .then(deleted => console.log(`Deleted role ${deleted.name}`))
   *   .catch(console.error);
   */
  public delete(role: RoleResolvable, reason?: string): Promise<void>;

  /**
   * Batch-updates the guild's role positions
   * @param rolePositions Role positions to update
   * @example
   * guild.roles.setPositions([{ role: roleId, position: updatedRoleIndex }])
   *  .then(guild => console.log(`Role positions updated for ${guild}`))
   *  .catch(console.error);
   */
  public setPositions(rolePositions: readonly RolePosition[]): Promise<Guild>;

  /**
   * Compares the positions of two roles.
   * @param role1 First role to compare
   * @param role2 Second role to compare
   * @returns Negative number if the first role's position is lower (second role's is higher),
   * positive number if the first's is higher (second's is lower), 0 if equal
   */
  public comparePositions(role1: RoleResolvable, role2: RoleResolvable): number;
}

/**
 * Manages API methods for {@link StageInstance} objects and holds their cache.
 */
export class StageInstanceManager extends CachedManager<Snowflake, StageInstance, StageInstanceResolvable> {
  public constructor(guild: Guild, iterable?: Iterable<RawStageInstanceData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;

  /**
   * Creates a new stage instance.
   * @param channel The stage channel to associate the created stage instance to
   * @param options The options to create the stage instance
   * @example
   * // Create a stage instance
   * guild.stageInstances.create('1234567890123456789', {
   *  topic: 'A very creative topic',
   *  privacyLevel: 'GUILD_ONLY'
   * })
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error);
   */
  public create(channel: StageChannelResolvable, options: StageInstanceCreateOptions): Promise<StageInstance>;

  /**
   * Fetches the stage instance associated with a stage channel, if it exists.
   * @param channel The stage channel whose associated stage instance is to be fetched
   * @param options Additional options for this fetch
   * @example
   * // Fetch a stage instance
   * guild.stageInstances.fetch('1234567890123456789')
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error);
   */
  public fetch(channel: StageChannelResolvable, options?: BaseFetchOptions): Promise<StageInstance>;

  /**
   * Edits an existing stage instance.
   * @param channel The stage channel whose associated stage instance is to be edited
   * @param options The options to edit the stage instance
   * @example
   * // Edit a stage instance
   * guild.stageInstances.edit('1234567890123456789', { topic: 'new topic' })
   *  .then(stageInstance => console.log(stageInstance))
   *  .catch(console.error);
   */
  public edit(channel: StageChannelResolvable, options: StageInstanceEditOptions): Promise<StageInstance>;

  /**
   * Deletes an existing stage instance.
   * @param channel The stage channel whose associated stage instance is to be deleted
   */
  public delete(channel: StageChannelResolvable): Promise<void>;
}

/**
 * Manages API methods for {@link ThreadChannel} objects and stores their cache.
 */
export class ThreadManager<AllowedThreadType> extends CachedManager<Snowflake, ThreadChannel, ThreadChannelResolvable> {
  public constructor(channel: TextChannel | NewsChannel, iterable?: Iterable<RawThreadChannelData>);

  /**
   * The channel this Manager belongs to
   */
  public channel: TextChannel | NewsChannel;

  /**
   * Creates a new thread in the channel.
   * @param options Options to create a new thread
   * @example
   * // Create a new public thread
   * channel.threads
   *   .create({
   *     name: 'food-talk',
   *     autoArchiveDuration: 60,
   *     reason: 'Needed a separate thread for food',
   *   })
   *   .then(threadChannel => console.log(threadChannel))
   *   .catch(console.error);
   * @example
   * // Create a new private thread
   * channel.threads
   *   .create({
   *      name: 'mod-talk',
   *      autoArchiveDuration: 60,
   *      type: 'GUILD_PRIVATE_THREAD',
   *      reason: 'Needed a separate thread for moderation',
   *    })
   *   .then(threadChannel => console.log(threadChannel))
   *   .catch(console.error);
   */
  public create(options: ThreadCreateOptions<AllowedThreadType>): Promise<ThreadChannel>;

  /**
   * Obtains a thread from Discord, or the channel cache if it's already available.
   * @param options The options to fetch threads. If it is a
   * ThreadChannelResolvable then the specified thread will be fetched. Fetches all active threads if `undefined`
   * @param cacheOptions Additional options for this fetch. <warn>The `force` field gets ignored
   * if `options` is not a {@link ThreadChannelResolvable}</warn>
   * @example
   * // Fetch a thread by its id
   * channel.threads.fetch('831955138126104859')
   *   .then(channel => console.log(channel.name))
   *   .catch(console.error);
   */
  public fetch(options: ThreadChannelResolvable, cacheOptions?: BaseFetchOptions): Promise<ThreadChannel | null>;
  public fetch(options?: FetchThreadsOptions, cacheOptions?: { cache?: boolean }): Promise<FetchedThreads>;

  /**
   * Obtains a set of archived threads from Discord, requires `READ_MESSAGE_HISTORY` in the parent channel.
   * @param options The options to fetch archived threads
   * @param cache Whether to cache the new thread objects if they aren't already
   */
  public fetchArchived(options?: FetchArchivedThreadOptions, cache?: boolean): Promise<FetchedThreads>;

  /**
   * Obtains the accessible active threads from Discord, requires `READ_MESSAGE_HISTORY` in the parent channel.
   * @param cache Whether to cache the new thread objects if they aren't already
   */
  public fetchActive(cache?: boolean): Promise<FetchedThreads>;
}

/**
 * Manages API methods for GuildMembers and stores their cache.
 */
export class ThreadMemberManager extends CachedManager<Snowflake, ThreadMember, ThreadMemberResolvable> {
  public constructor(thread: ThreadChannel, iterable?: Iterable<RawThreadMemberData>);

  /**
   * The thread this manager belongs to
   */
  public thread: ThreadChannel;

  /**
   * Adds a member to the thread.
   * @param member The member to add
   * @param reason The reason for adding this member
   */
  public add(member: UserResolvable | '@me', reason?: string): Promise<Snowflake>;

  /**
   * Fetches member(s) for the thread from Discord, requires access to the `GUILD_MEMBERS` gateway intent.
   * @param member The member to fetch. If `undefined`, all members in the thread are fetched, and will be
   * cached based on `options.cache`. If boolean, this serves the purpose of `options.cache`.
   * @param options Additional options for this fetch
   */
  public fetch(member?: UserResolvable, options?: BaseFetchOptions): Promise<ThreadMember>;

  /**
   * @deprecated Use `fetch(member, options)` instead.
   */
  public fetch(cache?: boolean): Promise<Collection<Snowflake, ThreadMember>>;

  /**
   * Remove a user from the thread.
   * @param id The id of the member to remove
   * @param reason The reason for removing this member from the thread
   */
  public remove(id: Snowflake | '@me', reason?: string): Promise<Snowflake>;
}

/**
 * Manages API methods for users and stores their cache.
 */
export class UserManager extends CachedManager<Snowflake, User, UserResolvable> {
  public constructor(client: Client, iterable?: Iterable<RawUserData>);

  /**
   * The DM between the client's user and a user
   * @param userId The user id
   * @private
   */
  public dmChannel(userId: Snowflake): DMChannel | null;

  /**
   * Creates a {@link DMChannel} between the client and a user.
   * @param user The UserResolvable to identify
   * @param options Additional options for this fetch
   */
  public createDM(user: UserResolvable, options?: BaseFetchOptions): Promise<DMChannel>;

  /**
   * Deletes a {@link DMChannel} (if one exists) between the client and a user. Resolves with the channel if successful.
   * @param user The UserResolvable to identify
   */
  public deleteDM(user: UserResolvable): Promise<DMChannel>;

  /**
   * Obtains a user from Discord, or the user cache if it's already available.
   * @param user The user to fetch
   * @param options Additional options for this fetch
   */
  public fetch(user: UserResolvable, options?: BaseFetchOptions): Promise<User>;

  /**
   * Fetches a user's flags.
   * @param user The UserResolvable to identify
   * @param options Additional options for this fetch
   */
  public fetchFlags(user: UserResolvable, options?: BaseFetchOptions): Promise<UserFlags>;

  /**
   * Sends a message to a user.
   * @param user The UserResolvable to identify
   * @param options The options to provide
   */
  public send(user: UserResolvable, options: string | MessagePayload | MessageOptions): Promise<Message>;
}

/**
 * Manages API methods for VoiceStates and stores their cache.
 */
export class VoiceStateManager extends CachedManager<Snowflake, VoiceState, typeof VoiceState> {
  public constructor(guild: Guild, iterable?: Iterable<RawVoiceStateData>);

  /**
   * The guild this manager belongs to
   */
  public guild: Guild;
}

//#endregion

//#region Mixins

// Model the TextBasedChannel mixin system, allowing application of these fields
// to the classes that use these methods without having to manually add them
// to each of those classes

export type Constructable<T> = new (...args: any[]) => T;
export function PartialTextBasedChannel<T>(Base?: Constructable<T>): Constructable<T & PartialTextBasedChannelFields>;
export function TextBasedChannelMixin<T, I extends keyof TextBasedChannelFields = never>(
  Base?: Constructable<T>,
  ignore?: I[],
): Constructable<T & Omit<TextBasedChannelFields, I>>;

export interface PartialTextBasedChannelFields {
  /**
   * Sends a message to this channel.
   * @param options The options to provide
   * @example
   * // Send a basic message
   * channel.send('hello!')
   *   .then(message => console.log(`Sent message: ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Send a remote file
   * channel.send({
   *   files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send a local file
   * channel.send({
   *   files: [{
   *     attachment: 'entire/path/to/file.jpg',
   *     name: 'file.jpg'
   *     description: 'A description of the file'
   *   }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send an embed with a local image inside
   * channel.send({
   *   content: 'This is an embed',
   *   embeds: [
   *     {
   *       thumbnail: {
   *         url: 'attachment://file.jpg'
   *       }
   *     }
   *   ],
   *   files: [{
   *     attachment: 'entire/path/to/file.jpg',
   *     name: 'file.jpg'
   *     description: 'A description of the file'
   *   }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  send(options: string | MessagePayload | MessageOptions): Promise<Message>;
}

export interface TextBasedChannelFields extends PartialTextBasedChannelFields {
  /**
   * The channel's last message id, if one was sent
   */
  lastMessageId: Snowflake | null;

  /**
   * The Message object of the last message in the channel, if one was sent
   */
  readonly lastMessage: Message | null;

  /**
   * The timestamp when the last pinned message was pinned, if there was one
   */
  lastPinTimestamp: number | null;

  /**
   * The date when the last pinned message was pinned, if there was one
   */
  readonly lastPinAt: Date | null;

  /**
   * Collects a single component interaction that passes the filter.
   * The Promise will reject if the time expires.
   * @param options Options to pass to the internal collector
   * @example
   * // Collect a message component interaction
   * const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';
   * channel.awaitMessageComponent({ filter, time: 15_000 })
   *   .then(interaction => console.log(`${interaction.customId} was clicked!`))
   *   .catch(console.error);
   */
  awaitMessageComponent<T extends MessageComponentTypeResolvable = 'ACTION_ROW'>(
    options?: AwaitMessageCollectorOptionsParams<T, true>,
  ): Promise<MappedInteractionTypes[T]>;

  /**
   * Similar to createMessageCollector but in promise form.
   * Resolves with a collection of messages that pass the specified filter.
   * @param options Optional options to pass to the internal collector
   * @example
   * // Await !vote messages
   * const filter = m => m.content.startsWith('!vote');
   * // Errors: ['time'] treats ending because of the time limit as an error
   * channel.awaitMessages({ filter, max: 4, time: 60_000, errors: ['time'] })
   *   .then(collected => console.log(collected.size))
   *   .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
   */
  awaitMessages(options?: AwaitMessagesOptions): Promise<Collection<Snowflake, Message>>;

  /**
   * Bulk deletes given messages that are newer than two weeks.
   * @param messages Messages or number of messages to delete
   * @param filterOld Filter messages to remove those which are older than two weeks automatically
   * @returns Returns the deleted messages
   * @example
   * // Bulk delete messages
   * channel.bulkDelete(5)
   *   .then(messages => console.log(`Bulk deleted ${messages.size} messages`))
   *   .catch(console.error);
   */
  bulkDelete(
    messages: Collection<Snowflake, Message> | readonly MessageResolvable[] | number,
    filterOld?: boolean,
  ): Promise<Collection<Snowflake, Message>>;

  /**
   * Creates a button interaction collector.
   * @param options Options to send to the collector
   * @example
   * // Create a button interaction collector
   * const filter = (interaction) => interaction.customId === 'button' && interaction.user.id === 'someId';
   * const collector = channel.createMessageComponentCollector({ filter, time: 15_000 });
   * collector.on('collect', i => console.log(`Collected ${i.customId}`));
   * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
   */
  createMessageComponentCollector<T extends MessageComponentTypeResolvable = 'ACTION_ROW'>(
    options?: MessageChannelCollectorOptionsParams<T, true>,
  ): InteractionCollector<MappedInteractionTypes[T]>;

  /**
   * Creates a Message Collector.
   * @param options The options to pass to the collector
   * @example
   * // Create a message collector
   * const filter = m => m.content.includes('discord');
   * const collector = channel.createMessageCollector({ filter, time: 15_000 });
   * collector.on('collect', m => console.log(`Collected ${m.content}`));
   * collector.on('end', collected => console.log(`Collected ${collected.size} items`));
   */
  createMessageCollector(options?: MessageCollectorOptions): MessageCollector;

  /**
   * Sends a typing indicator in the channel.
   * @returns Resolves upon the typing status being sent
   * // Start typing in a channel
   * channel.sendTyping();
   */
  sendTyping(): Promise<void>;
}

export function PartialWebhookMixin<T>(Base?: Constructable<T>): Constructable<T & PartialWebhookFields>;
export function WebhookMixin<T>(Base?: Constructable<T>): Constructable<T & WebhookFields>;

export interface PartialWebhookFields {
  /**
   * The webhook's id
   */
  id: Snowflake;

  /**
   * The URL of this webhook
   */
  readonly url: string;

  /**
   * Delete a message that was sent by this webhook.
   * @param message The message to delete
   * @param threadId The id of the thread this message belongs to
   */
  deleteMessage(message: MessageResolvable | APIMessage | '@original', threadId?: Snowflake): Promise<void>;

  /**
   * Edits a message that was sent by this webhook.
   * @param message The message to edit
   * @param options The options to provide
   * @returns The raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   */
  editMessage(
    message: MessageResolvable | '@original',
    options: string | MessagePayload | WebhookEditMessageOptions,
  ): Promise<Message | APIMessage>;

  /**
   * Gets a message that was sent by this webhook.
   * @param message The id of the message to fetch
   * @param options The options to provide to fetch the message.
   * @returns Returns the raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   */
  fetchMessage(message: Snowflake | '@original', options?: WebhookFetchMessageOptions): Promise<Message | APIMessage>;

  /* tslint:disable:unified-signatures */
  /**
   * Gets a message that was sent by this webhook.
   * @param message The id of the message to fetch
   * @param cache boolean passed to specify whether to cache the message
   * @returns Returns the raw message data if the webhook was instantiated as a
   * {@link WebhookClient} or if the channel is uncached, otherwise a {@link Message} will be returned
   * @deprecated
   */
  fetchMessage(message: Snowflake | '@original', cache?: boolean): Promise<Message | APIMessage>;
  /* tslint:enable:unified-signatures */

  /**
   * Sends a message with this webhook.
   * @param options The options to provide
   * @example
   * // Send a basic message
   * webhook.send('hello!')
   *   .then(message => console.log(`Sent message: ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Send a basic message in a thread
   * webhook.send({ content: 'hello!', threadId: '836856309672348295' })
   *   .then(message => console.log(`Sent message: ${message.content}`))
   *   .catch(console.error);
   * @example
   * // Send a remote file
   * webhook.send({
   *   files: ['https://cdn.discordapp.com/icons/222078108977594368/6e1019b3179d71046e463a75915e7244.png?size=2048']
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send a local file
   * webhook.send({
   *   files: [{
   *     attachment: 'entire/path/to/file.jpg',
   *     name: 'file.jpg'
   *   }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   * @example
   * // Send an embed with a local image inside
   * webhook.send({
   *   content: 'This is an embed',
   *   embeds: [{
   *     thumbnail: {
   *          url: 'attachment://file.jpg'
   *       }
   *    }],
   *    files: [{
   *       attachment: 'entire/path/to/file.jpg',
   *       name: 'file.jpg'
   *    }]
   * })
   *   .then(console.log)
   *   .catch(console.error);
   */
  send(options: string | MessagePayload | WebhookMessageOptions): Promise<Message | APIMessage>;
}

export interface WebhookFields extends PartialWebhookFields {
  /**
   * The time the webhook was created at
   */
  readonly createdAt: Date;

  /**
   * The timestamp the webhook was created at
   */
  readonly createdTimestamp: number;

  /**
   * Deletes the webhook.
   * @param reason Reason for deleting this webhook
   */
  delete(reason?: string): Promise<void>;

  /**
   * Edits this webhook.
   * @param options Options for editing the webhook
   * @param reason Reason for editing the webhook
   */
  edit(options: WebhookEditData, reason?: string): Promise<Webhook>;

  /**
   * Sends a raw slack message with this webhook.
   * @param body The raw body to send
   * @example
   * // Send a slack message
   * webhook.sendSlackMessage({
   *   'username': 'Wumpus',
   *   'attachments': [{
   *     'pretext': 'this looks pretty cool',
   *     'color': '#F0F',
   *     'footer_icon': 'http://snek.s3.amazonaws.com/topSnek.png',
   *     'footer': 'Powered by sneks',
   *     'ts': Date.now() / 1_000
   *   }]
   * }).catch(console.error);
   * @see {@link [https://api.slack.com/messaging/webhooks](https://api.slack.com/messaging/webhooks)}
   */
  sendSlackMessage(body: unknown): Promise<boolean>;
}

//#endregion

//#region Typedefs

export type ActivityFlagsString =
  | 'INSTANCE'
  | 'JOIN'
  | 'SPECTATE'
  | 'JOIN_REQUEST'
  | 'SYNC'
  | 'PLAY'
  | 'PARTY_PRIVACY_FRIENDS'
  | 'PARTY_PRIVACY_VOICE_CHANNEL'
  | 'EMBEDDED';

/**
 * Options for setting activities
 */
export type ActivitiesOptions = Omit<ActivityOptions, 'shardId'>;

export interface ActivityOptions {
  /**
   * Name of the activity
   */
  name?: string;

  /**
   * Twitch / YouTube stream URL
   */
  url?: string;

  /**
   * Type of the activity
   */
  type?: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>;

  /**
   * Shard Id(s) to have the activity set on
   */
  shardId?: number | readonly number[];
}

/**
 * The platform of this activity:
 * * **`desktop`**
 * * **`samsung`** - playing on Samsung Galaxy
 * * **`xbox`** - playing on Xbox Live
 */
export type ActivityPlatform = 'desktop' | 'samsung' | 'xbox';

/**
 * <info>Bots cannot set a `CUSTOM` activity type, it is only for custom statuses received from users</info>
 * The type of an activity of a user's presence.
 * @see {@link [ActivityType Enum](https://discord.com/developers/docs/game-sdk/activities#data-models-activitytype-enum)}
 */
export type ActivityType = keyof typeof ActivityTypes;

/**
 * Options used to add a user to a guild using OAuth2.
 */
export interface AddGuildMemberOptions {
  /**
   * An OAuth2 access token for the user with the `guilds.join` scope granted to the bot's application
   */
  accessToken: string;

  /**
   * The nickname to give to the member (requires `MANAGE_NICKNAMES`)
   */
  nick?: string;

  /**
   * The roles to add to the member (requires `MANAGE_ROLES`)
   */
  roles?: Collection<Snowflake, Role> | RoleResolvable[];

  /**
   * Whether the member should be muted (requires `MUTE_MEMBERS`)
   */
  mute?: boolean;

  /**
   * Whether the member should be deafened (requires `DEAFEN_MEMBERS`)
   */
  deaf?: boolean;

  /**
   * Whether to skip the cache check and call the API directly
   */
  force?: boolean;

  /**
   * Whether to fetch the user if not cached and already a member
   */

  fetchWhenExisting?: boolean;
}

export type AllowedImageFormat = 'webp' | 'png' | 'jpg' | 'jpeg';

export type AllowedImageSize = 16 | 32 | 56 | 64 | 96 | 128 | 256 | 300 | 512 | 600 | 1024 | 2048 | 4096;

export type AllowedPartial = User | Channel | GuildMember | Message | MessageReaction;

export type AllowedThreadTypeForNewsChannel = 'GUILD_NEWS_THREAD' | 10;

export type AllowedThreadTypeForTextChannel = 'GUILD_PUBLIC_THREAD' | 'GUILD_PRIVATE_THREAD' | 11 | 12;

/**
 * An error encountered while performing an API request.
 * @see {@link [JSON Error Codes](https://discord.com/developers/docs/topics/opcodes-and-status-codes#json-json-error-codes)}
 */
export interface APIErrors {
  UNKNOWN_ACCOUNT: 10001;
  UNKNOWN_APPLICATION: 10002;
  UNKNOWN_CHANNEL: 10003;
  UNKNOWN_GUILD: 10004;
  UNKNOWN_INTEGRATION: 10005;
  UNKNOWN_INVITE: 10006;
  UNKNOWN_MEMBER: 10007;
  UNKNOWN_MESSAGE: 10008;
  UNKNOWN_OVERWRITE: 10009;
  UNKNOWN_PROVIDER: 10010;
  UNKNOWN_ROLE: 10011;
  UNKNOWN_TOKEN: 10012;
  UNKNOWN_USER: 10013;
  UNKNOWN_EMOJI: 10014;
  UNKNOWN_WEBHOOK: 10015;
  UNKNOWN_WEBHOOK_SERVICE: 10016;
  UNKNOWN_SESSION: 10020;
  UNKNOWN_BAN: 10026;
  UNKNOWN_SKU: 10027;
  UNKNOWN_STORE_LISTING: 10028;
  UNKNOWN_ENTITLEMENT: 10029;
  UNKNOWN_BUILD: 10030;
  UNKNOWN_LOBBY: 10031;
  UNKNOWN_BRANCH: 10032;
  UNKNOWN_STORE_DIRECTORY_LAYOUT: 10033;
  UNKNOWN_REDISTRIBUTABLE: 10036;
  UNKNOWN_GIFT_CODE: 10038;
  UNKNOWN_STREAM: 10049;
  UNKNOWN_PREMIUM_SERVER_SUBSCRIBE_COOLDOWN: 10050;
  UNKNOWN_GUILD_TEMPLATE: 10057;
  UNKNOWN_DISCOVERABLE_SERVER_CATEGORY: 10059;
  UNKNOWN_STICKER: 10060;
  UNKNOWN_INTERACTION: 10062;
  UNKNOWN_APPLICATION_COMMAND: 10063;
  UNKNOWN_APPLICATION_COMMAND_PERMISSIONS: 10066;
  UNKNOWN_STAGE_INSTANCE: 10067;
  UNKNOWN_GUILD_MEMBER_VERIFICATION_FORM: 10068;
  UNKNOWN_GUILD_WELCOME_SCREEN: 10069;
  UNKNOWN_GUILD_SCHEDULED_EVENT: 10070;
  UNKNOWN_GUILD_SCHEDULED_EVENT_USER: 10071;
  BOT_PROHIBITED_ENDPOINT: 20001;
  BOT_ONLY_ENDPOINT: 20002;
  CANNOT_SEND_EXPLICIT_CONTENT: 20009;
  NOT_AUTHORIZED: 20012;
  SLOWMODE_RATE_LIMIT: 20016;
  ACCOUNT_OWNER_ONLY: 20018;
  ANNOUNCEMENT_EDIT_LIMIT_EXCEEDED: 20022;
  CHANNEL_HIT_WRITE_RATELIMIT: 20028;
  SERVER_HIT_WRITE_RATELIMIT: 20029;
  CONTENT_NOT_ALLOWED: 20031;
  GUILD_PREMIUM_LEVEL_TOO_LOW: 20035;
  MAXIMUM_GUILDS: 30001;
  MAXIMUM_FRIENDS: 30002;
  MAXIMUM_PINS: 30003;
  MAXIMUM_RECIPIENTS: 30004;
  MAXIMUM_ROLES: 30005;
  MAXIMUM_WEBHOOKS: 30007;
  MAXIMUM_EMOJIS: 30008;
  MAXIMUM_REACTIONS: 30010;
  MAXIMUM_CHANNELS: 30013;
  MAXIMUM_ATTACHMENTS: 30015;
  MAXIMUM_INVITES: 30016;
  MAXIMUM_ANIMATED_EMOJIS: 30018;
  MAXIMUM_SERVER_MEMBERS: 30019;
  MAXIMUM_NUMBER_OF_SERVER_CATEGORIES: 30030;
  GUILD_ALREADY_HAS_TEMPLATE: 30031;
  MAXIMUM_THREAD_PARICIPANTS: 30033;
  MAXIMUM_NON_GUILD_MEMBERS_BANS: 30035;
  MAXIMUM_BAN_FETCHES: 30037;
  MAXIMUM_NUMBER_OF_UNCOMPLETED_GUILD_SCHEDULED_EVENTS_REACHED: 30038;
  MAXIMUM_NUMBER_OF_STICKERS_REACHED: 30039;
  MAXIMUM_PRUNE_REQUESTS: 30040;
  MAXIMUM_GUILD_WIDGET_SETTINGS_UPDATE: 30042;
  UNAUTHORIZED: 40001;
  ACCOUNT_VERIFICATION_REQUIRED: 40002;
  DIRECT_MESSAGES_TOO_FAST: 40003;
  REQUEST_ENTITY_TOO_LARGE: 40005;
  FEATURE_TEMPORARILY_DISABLED: 40006;
  USER_BANNED: 40007;
  TARGET_USER_NOT_CONNECTED_TO_VOICE: 40032;
  ALREADY_CROSSPOSTED: 40033;
  MISSING_ACCESS: 50001;
  INVALID_ACCOUNT_TYPE: 50002;
  CANNOT_EXECUTE_ON_DM: 50003;
  EMBED_DISABLED: 50004;
  CANNOT_EDIT_MESSAGE_BY_OTHER: 50005;
  CANNOT_SEND_EMPTY_MESSAGE: 50006;
  CANNOT_MESSAGE_USER: 50007;
  CANNOT_SEND_MESSAGES_IN_VOICE_CHANNEL: 50008;
  CHANNEL_VERIFICATION_LEVEL_TOO_HIGH: 50009;
  OAUTH2_APPLICATION_BOT_ABSENT: 50010;
  MAXIMUM_OAUTH2_APPLICATIONS: 50011;
  INVALID_OAUTH_STATE: 50012;
  MISSING_PERMISSIONS: 50013;
  INVALID_AUTHENTICATION_TOKEN: 50014;
  NOTE_TOO_LONG: 50015;
  INVALID_BULK_DELETE_QUANTITY: 50016;
  CANNOT_PIN_MESSAGE_IN_OTHER_CHANNEL: 50019;
  INVALID_OR_TAKEN_INVITE_CODE: 50020;
  CANNOT_EXECUTE_ON_SYSTEM_MESSAGE: 50021;
  CANNOT_EXECUTE_ON_CHANNEL_TYPE: 50024;
  INVALID_OAUTH_TOKEN: 50025;
  MISSING_OAUTH_SCOPE: 50026;
  INVALID_WEBHOOK_TOKEN: 50027;
  INVALID_ROLE: 50028;
  INVALID_RECIPIENTS: 50033;
  BULK_DELETE_MESSAGE_TOO_OLD: 50034;
  INVALID_FORM_BODY: 50035;
  INVITE_ACCEPTED_TO_GUILD_NOT_CONTAINING_BOT: 50036;
  INVALID_API_VERSION: 50041;
  FILE_UPLOADED_EXCEEDS_MAXIMUM_SIZE: 50045;
  INVALID_FILE_UPLOADED: 50046;
  CANNOT_SELF_REDEEM_GIFT: 50054;
  INVALID_GUILD: 50055;
  PAYMENT_SOURCE_REQUIRED: 50070;
  CANNOT_DELETE_COMMUNITY_REQUIRED_CHANNEL: 50074;
  INVALID_STICKER_SENT: 50081;
  INVALID_THREAD_ARCHIVE_STATE: 50083;
  INVALID_THREAD_NOTIFICATION_SETTINGS: 50084;
  PARAMETER_EARLIER_THAN_CREATION: 50085;
  GUILD_NOT_AVAILABLE_IN_LOCATION: 50095;
  GUILD_MONETIZATION_REQUIRED: 50097;
  INSUFFICIENT_BOOSTS: 50101;
  INVALID_JSON: 50109;
  TWO_FACTOR_REQUIRED: 60003;
  NO_USERS_WITH_DISCORDTAG_EXIST: 80004;
  REACTION_BLOCKED: 90001;
  RESOURCE_OVERLOADED: 130000;
  STAGE_ALREADY_OPEN: 150006;
  CANNOT_REPLY_WITHOUT_READ_MESSAGE_HISTORY_PERMISSION: 160002;
  MESSAGE_ALREADY_HAS_THREAD: 160004;
  THREAD_LOCKED: 160005;
  MAXIMUM_ACTIVE_THREADS: 160006;
  MAXIMUM_ACTIVE_ANNOUNCEMENT_THREADS: 160007;
  INVALID_JSON_FOR_UPLOADED_LOTTIE_FILE: 170001;
  UPLOADED_LOTTIES_CANNOT_CONTAIN_RASTERIZED_IMAGES: 170002;
  STICKER_MAXIMUM_FRAMERATE_EXCEEDED: 170003;
  STICKER_FRAME_COUNT_EXCEEDS_MAXIMUM_OF_1000_FRAMES: 170004;
  LOTTIE_ANIMATION_MAXIMUM_DIMENSIONS_EXCEEDED: 170005;
  STICKER_FRAME_RATE_IS_TOO_SMALL_OR_TOO_LARGE: 170006;
  STICKER_ANIMATION_DURATION_EXCEEDS_MAXIMUM_OF_5_SECONDS: 170007;
  CANNOT_UPDATE_A_FINISHED_EVENT: 180000;
  FAILED_TO_CREATE_STAGE_NEEDED_FOR_STAGE_EVENT: 180002;
}

/**
 * Represents a request that will or has been made to the Discord API
 */
export interface APIRequest {
  /**
   * The HTTP method used in this request
   */
  method: 'get' | 'post' | 'delete' | 'patch' | 'put';

  /**
   * Additional options for this request
   */
  options: unknown;

  /**
   * The full path used to make the request
   */
  path: string;

  /**
   * The number of times this request has been attempted
   */
  retries: number;

  /**
   * The API route identifying the rate limit for this request
   */
  route: string;
}

/**
 * Asset data.
 */
export interface ApplicationAsset {
  /**
   * The asset's name
   */
  name: string;

  /**
   * The asset's id
   */
  id: Snowflake;

  /**
   * The asset's type
   */
  type: 'BIG' | 'SMALL';
}

/**
 * Base data for creating or editing an application command.
 */
export interface BaseApplicationCommandData {
  /**
   * The name of the command
   */
  name: string;

  /**
   * Whether the command is enabled by default when the app is added to a guild
   */
  defaultPermission?: boolean;
}

export type CommandOptionDataTypeResolvable = ApplicationCommandOptionType | ApplicationCommandOptionTypes;

export type CommandOptionChannelResolvableType = ApplicationCommandOptionTypes.CHANNEL | 'CHANNEL';

export type CommandOptionChoiceResolvableType =
  | ApplicationCommandOptionTypes.STRING
  | 'STRING'
  | CommandOptionNumericResolvableType;

export type CommandOptionNumericResolvableType =
  | ApplicationCommandOptionTypes.NUMBER
  | 'NUMBER'
  | ApplicationCommandOptionTypes.INTEGER
  | 'INTEGER';

export type CommandOptionSubOptionResolvableType =
  | ApplicationCommandOptionTypes.SUB_COMMAND
  | 'SUB_COMMAND'
  | ApplicationCommandOptionTypes.SUB_COMMAND_GROUP
  | 'SUB_COMMAND_GROUP';

export type CommandOptionNonChoiceResolvableType = Exclude<
  CommandOptionDataTypeResolvable,
  CommandOptionChoiceResolvableType | CommandOptionSubOptionResolvableType | CommandOptionChannelResolvableType
>;

export interface BaseApplicationCommandOptionsData {
  /**
   * The name of the option
   */
  name: string;

  /**
   * The description of the option
   */
  description: string;

  /**
   * Whether the option is required
   */
  required?: boolean;

  /**
   * Whether the option is an autocomplete option
   */
  autocomplete?: never;
}

/**
 * Data for creating or editing a user application command.
 */
export interface UserApplicationCommandData extends BaseApplicationCommandData {
  /**
   * The type of the command
   */
  type: 'USER' | ApplicationCommandTypes.USER;
}

/**
 * Data for creating or editing a message application command.
 */
export interface MessageApplicationCommandData extends BaseApplicationCommandData {
  /**
   * The type of the command
   */
  type: 'MESSAGE' | ApplicationCommandTypes.MESSAGE;
}

/**
 * Data for creating or editing a chat input application command.
 */
export interface ChatInputApplicationCommandData extends BaseApplicationCommandData {
  /**
   * The description of the command
   */
  description: string;

  /**
   * The type of the command
   */
  type?: 'CHAT_INPUT' | ApplicationCommandTypes.CHAT_INPUT;

  /**
   * Options for the command
   */
  options?: ApplicationCommandOptionData[];
}

/**
 * Data for creating or editing an application command.
 */
export type ApplicationCommandData =
  | UserApplicationCommandData
  | MessageApplicationCommandData
  | ChatInputApplicationCommandData;

export interface ApplicationCommandChannelOptionData extends BaseApplicationCommandOptionsData {
  /**
   * The type of the option
   */
  type: CommandOptionChannelResolvableType;

  /**
   * When the option type is channel, the allowed types of channels that can be selected
   */
  channelTypes?: ExcludeEnum<typeof ChannelTypes, 'UNKNOWN'>[];

  /**
   * When the option type is channel, the API data for allowed types of channels that can be selected
   * <warn>This is provided for compatibility with something like `@discordjs/builders`
   */
  channel_types?: Exclude<ChannelTypes, ChannelTypes.UNKNOWN>[];
}

export interface ApplicationCommandChannelOption extends BaseApplicationCommandOptionsData {
  /**
   * The type of the option
   */
  type: 'CHANNEL';

  /**
   * When the option type is channel, the allowed types of channels that can be selected
   */
  channelTypes?: (keyof typeof ChannelTypes)[];
}

export interface ApplicationCommandAutocompleteOption extends Omit<BaseApplicationCommandOptionsData, 'autocomplete'> {
  /**
   * The type of the option
   */
  type:
    | 'STRING'
    | 'NUMBER'
    | 'INTEGER'
    | ApplicationCommandOptionTypes.STRING
    | ApplicationCommandOptionTypes.NUMBER
    | ApplicationCommandOptionTypes.INTEGER;

  /**
   * Whether the option is an autocomplete option
   */
  autocomplete: true;
}

export interface ApplicationCommandChoicesData extends Omit<BaseApplicationCommandOptionsData, 'autocomplete'> {
  /**
   * The type of the option
   */
  type: CommandOptionChoiceResolvableType;

  /**
   * The choices of the option for the user to pick from
   */
  choices?: ApplicationCommandOptionChoice[];

  /**
   * Whether the option is an autocomplete option
   */
  autocomplete?: false;
}

export interface ApplicationCommandChoicesOption extends Omit<BaseApplicationCommandOptionsData, 'autocomplete'> {
  /**
   * The type of the option
   */
  type: Exclude<CommandOptionChoiceResolvableType, ApplicationCommandOptionTypes>;

  /**
   * The choices of the option for the user to pick from
   */
  choices?: ApplicationCommandOptionChoice[];

  /**
   * Whether the option is an autocomplete option
   */
  autocomplete?: false;
}

export interface ApplicationCommandNumericOptionData extends ApplicationCommandChoicesData {
  /**
   * The type of the option
   */
  type: CommandOptionNumericResolvableType;

  /**
   * The minimum value for an `INTEGER` or `NUMBER` option
   */
  minValue?: number;

  /**
   * The minimum value for an `INTEGER` or `NUMBER` option
   */
  min_value?: number;

  /**
   * The maximum value for an `INTEGER` or `NUMBER` option
   */
  maxValue?: number;

  /**
   * The maximum value for an `INTEGER` or `NUMBER` option
   */
  max_value?: number;
}

export interface ApplicationCommandNumericOption extends ApplicationCommandChoicesOption {
  /**
   * The type of the option
   */
  type: Exclude<CommandOptionNumericResolvableType, ApplicationCommandOptionTypes>;

  /**
   * The minimum value for an `INTEGER` or `NUMBER` option
   */
  minValue?: number;

  /**
   * The maximum value for an `INTEGER` or `NUMBER` option
   */
  maxValue?: number;
}

export interface ApplicationCommandSubGroupData extends Omit<BaseApplicationCommandOptionsData, 'required'> {
  /**
   * The type of the option
   */
  type: 'SUB_COMMAND_GROUP' | ApplicationCommandOptionTypes.SUB_COMMAND_GROUP;

  /**
   * Additional options if this option is a subcommand (group)
   */
  options?: ApplicationCommandSubCommandData[];
}

export interface ApplicationCommandSubGroup extends Omit<BaseApplicationCommandOptionsData, 'required'> {
  /**
   * The type of the option
   */
  type: 'SUB_COMMAND_GROUP';

  /**
   * Additional options if this option is a subcommand (group)
   */
  options?: ApplicationCommandSubCommand[];
}

export interface ApplicationCommandSubCommandData extends Omit<BaseApplicationCommandOptionsData, 'required'> {
  /**
   * The choices of the option for the user to pick from
   */
  type: 'SUB_COMMAND' | ApplicationCommandOptionTypes.SUB_COMMAND;

  /**
   * Additional options if this option is a subcommand (group)
   */
  options?: (
    | ApplicationCommandChoicesData
    | ApplicationCommandNonOptionsData
    | ApplicationCommandChannelOptionData
    | ApplicationCommandAutocompleteOption
    | ApplicationCommandNumericOptionData
  )[];
}

export interface ApplicationCommandSubCommand extends Omit<BaseApplicationCommandOptionsData, 'required'> {
  /**
   * The type of the option
   */
  type: 'SUB_COMMAND';

  /**
   * Additional options if this option is a subcommand (group)
   */
  options?: (ApplicationCommandChoicesOption | ApplicationCommandNonOptions | ApplicationCommandChannelOption)[];
}

export interface ApplicationCommandNonOptionsData extends BaseApplicationCommandOptionsData {
  /**
   * The type of the option
   */
  type: CommandOptionNonChoiceResolvableType;
}

export interface ApplicationCommandNonOptions extends BaseApplicationCommandOptionsData {
  /**
   * The type of the option
   */
  type: Exclude<CommandOptionNonChoiceResolvableType, ApplicationCommandOptionTypes>;
}

/**
 * An option for an application command or subcommand.
 */
export type ApplicationCommandOptionData =
  | ApplicationCommandSubGroupData
  | ApplicationCommandNonOptionsData
  | ApplicationCommandChannelOptionData
  | ApplicationCommandChoicesData
  | ApplicationCommandAutocompleteOption
  | ApplicationCommandNumericOptionData
  | ApplicationCommandSubCommandData;

/**
 * An option for an application command or subcommand.
 */
export type ApplicationCommandOption =
  | ApplicationCommandSubGroup
  | ApplicationCommandNonOptions
  | ApplicationCommandChannelOption
  | ApplicationCommandChoicesOption
  | ApplicationCommandNumericOption
  | ApplicationCommandSubCommand;

/**
 * A choice for an application command option.
 */
export interface ApplicationCommandOptionChoice {
  /**
   * The name of the choice
   */
  name: string;

  /**
   * The value of the choice
   */
  value: string | number;
}

/**
 * The type of an {@link ApplicationCommand} object
 * @see {@link [Application Command Types](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types)}
 */
export type ApplicationCommandType = keyof typeof ApplicationCommandTypes;

/**
 * The type of an {@link ApplicationCommandOption} object
 * @see {@link [Application Command Option Type](https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type)}
 */
export type ApplicationCommandOptionType = keyof typeof ApplicationCommandOptionTypes;

/**
 * Data for setting the permissions of an application command.
 */
export interface ApplicationCommandPermissionData {
  /**
   * The role or user's id
   */
  id: Snowflake;

  /**
   * Whether this permission is for a role or a user
   */
  type: ApplicationCommandPermissionType | ApplicationCommandPermissionTypes;

  /**
   * Whether the role or user has the permission to use this command
   */
  permission: boolean;
}

/**
 * The object returned when fetching permissions for an application command.
 */
export interface ApplicationCommandPermissions extends ApplicationCommandPermissionData {
  /**
   * Whether this permission is for a role or a user
   */
  type: ApplicationCommandPermissionType;
}

/**
 * The type of an {@link ApplicationCommandPermissions} object
 * @see {@link [Application Command Permission Type](https://discord.com/developers/docs/interactions/application-commands#application-command-permissions-object-application-command-permission-type)}
 */
export type ApplicationCommandPermissionType = keyof typeof ApplicationCommandPermissionTypes;

/**
 * Data that resolves to give an ApplicationCommand object.
 */
export type ApplicationCommandResolvable = ApplicationCommand | Snowflake;

export type ApplicationFlagsString =
  | 'GATEWAY_PRESENCE'
  | 'GATEWAY_PRESENCE_LIMITED'
  | 'GATEWAY_GUILD_MEMBERS'
  | 'GATEWAY_GUILD_MEMBERS_LIMITED'
  | 'VERIFICATION_PENDING_GUILD_LIMIT'
  | 'EMBEDDED'
  | 'GATEWAY_MESSAGE_CONTENT'
  | 'GATEWAY_MESSAGE_CONTENT_LIMITED';

/**
 * An entry in the audit log representing a specific change.
 */
export interface AuditLogChange {
  /**
   * The property that was changed, e.g. `nick` for nickname changes
   */
  key: APIAuditLogChange['key'];

  /**
   * The old value of the change, e.g. for nicknames, the old nickname
   */
  old?: APIAuditLogChange['old_value'];

  /**
   * The new value of the change, e.g. for nicknames, the new nickname
   */
  new?: APIAuditLogChange['new_value'];
}

export type Awaitable<T> = T | PromiseLike<T>;

/**
 * An object containing the same properties as CollectorOptions, but a few more
 */
export type AwaitMessageComponentOptions<T extends MessageComponentInteraction> = Omit<
  MessageComponentCollectorOptions<T>,
  'max' | 'maxComponents' | 'maxUsers'
>;

/**
 * An object containing the same properties as CollectorOptions, but a few more:
 */
export interface AwaitMessagesOptions extends MessageCollectorOptions {
  /**
   * Stop/end reasons that cause the promise to reject
   */
  errors?: string[];
}

/**
 * An object containing the same properties as CollectorOptions, but a few more
 */
export interface AwaitReactionsOptions extends ReactionCollectorOptions {
  /**
   * Stop/end reasons that cause the promise to reject
   */
  errors?: string[];
}

/**
 * Options used to ban a user from a guild.
 */
export interface BanOptions {
  /**
   * Number of days of messages to delete, must be between 0 and 7, inclusive
   */
  days?: number;

  /**
   * The reason for the ban
   */
  reason?: string;
}

/**
 * Data that resolves to give a Base64 string, typically for image uploading.
 */
export type Base64Resolvable = Buffer | Base64String;

export type Base64String = string;

/**
 * Options used to fetch data from Discord
 */
export interface BaseFetchOptions {
  /**
   * Whether to cache the fetched data if it wasn't already
   */
  cache?: boolean;

  /**
   * Whether to skip the cache check and request the API
   */
  force?: boolean;
}

/**
 * Options for a BaseMessageComponent
 */
export interface BaseMessageComponentOptions {
  /**
   * The type of this component
   */
  type?: MessageComponentType | MessageComponentTypes;
}

/**
 * Data that can be resolved to give a bitfield. This can be:
 * * A bit number (this can be a number literal or a value taken from {@link BitField.FLAGS})
 * * A string bit number
 * * An instance of BitField
 * * An Array of BitFieldResolvable
 */
export type BitFieldResolvable<T extends string, N extends number | bigint> =
  | RecursiveReadonlyArray<T | N | `${bigint}` | Readonly<BitField<T, N>>>
  | T
  | N
  | `${bigint}`
  | Readonly<BitField<T, N>>;

/**
 * Data that can be resolved to give a Buffer. This can be:
 * * A Buffer
 * * The path to a local file
 * * A URL <warn>When provided a URL, discord.js will fetch the URL internally in order to create a Buffer.
 * This can pose a security risk when the URL has not been sanitized</warn>
 */
export type BufferResolvable = Buffer | string;

export interface Caches {
  /**
   * Manages API methods for application commands and stores their cache.
   */
  ApplicationCommandManager: [manager: typeof ApplicationCommandManager, holds: typeof ApplicationCommand];

  /**
   * Holds methods to resolve GuildEmojis and stores their cache.
   */
  BaseGuildEmojiManager: [manager: typeof BaseGuildEmojiManager, holds: typeof GuildEmoji];

  /**
   * Manages API methods for GuildEmojis and stores their cache.
   */
  GuildEmojiManager: [manager: typeof GuildEmojiManager, holds: typeof GuildEmoji];

  // /**
  //  * A manager of channels belonging to a client
  //  */
  // TODO: ChannelManager: [manager: typeof ChannelManager, holds: typeof Channel];

  // /**
  //  * Manages API methods for GuildChannels and stores their cache.
  //  */
  // TODO: GuildChannelManager: [manager: typeof GuildChannelManager, holds: typeof GuildChannel];

  // /**
  //  * Manages API methods for Guilds and stores their cache.
  //  */
  // TODO: GuildManager: [manager: typeof GuildManager, holds: typeof Guild];

  /**
   * Manages API methods for GuildBans and stores their cache.
   */
  GuildMemberManager: [manager: typeof GuildMemberManager, holds: typeof GuildMember];

  /**
   * Manages API methods for GuildBans and stores their cache.
   */
  GuildBanManager: [manager: typeof GuildBanManager, holds: typeof GuildBan];

  /**
   * Manages API methods for GuildInvites and stores their cache.
   */
  GuildInviteManager: [manager: typeof GuildInviteManager, holds: typeof Invite];

  /**
   * Represents a scheduled event in a {@link Guild}.
   */
  GuildScheduledEventManager: [manager: typeof GuildScheduledEventManager, holds: typeof GuildScheduledEvent];

  /**
   * Manages API methods for Guild Stickers and stores their cache.
   */
  GuildStickerManager: [manager: typeof GuildStickerManager, holds: typeof Sticker];

  /**
   * Manages API methods for Messages and holds their cache.
   */
  MessageManager: [manager: typeof MessageManager, holds: typeof Message];

  /**
   * Manages API methods for guild channel permission overwrites and stores their cache.
   */
  // TODO: PermissionOverwriteManager: [manager: typeof PermissionOverwriteManager, holds: typeof PermissionOverwrites];

  /**
   * Manages API methods for Presences and holds their cache.
   */
  PresenceManager: [manager: typeof PresenceManager, holds: typeof Presence];

  /**
   * Manages API methods for reactions and holds their cache.
   */
  ReactionManager: [manager: typeof ReactionManager, holds: typeof MessageReaction];

  /**
   * Manages API methods for users who reacted to a reaction and stores their cache.
   */
  ReactionUserManager: [manager: typeof ReactionUserManager, holds: typeof User];

  /**
   * Manages API methods for roles and stores their cache.
   */
  // TODO: RoleManager: [manager: typeof RoleManager, holds: typeof Role];

  /**
   * Manages API methods for {@link StageInstance} objects and holds their cache.
   */
  StageInstanceManager: [manager: typeof StageInstanceManager, holds: typeof StageInstance];

  /**
   * Manages API methods for {@link ThreadChannel} objects and stores their cache.
   */
  ThreadManager: [manager: typeof ThreadManager, holds: typeof ThreadChannel];

  /**
   * Manages API methods for GuildMembers and stores their cache.
   */
  ThreadMemberManager: [manager: typeof ThreadMemberManager, holds: typeof ThreadMember];

  /**
   * Manages API methods for users and stores their cache.
   */
  UserManager: [manager: typeof UserManager, holds: typeof User];

  /**
   * Manages API methods for VoiceStates and stores their cache.
   */
  VoiceStateManager: [manager: typeof VoiceStateManager, holds: typeof VoiceState];
}

export type CacheConstructors = {
  [K in keyof Caches]: Caches[K][0] & { name: K };
};

// This doesn't actually work the way it looks 😢.
// Narrowing the type of `manager.name` doesn't propagate type information to `holds` and the return type.
/**
 * @param manager The manager class the cache is being requested from.
 * @param holds The class that the cache will hold.
 * @returns A Collection used to store the cache of the manager.
 */
export type CacheFactory = (
  manager: CacheConstructors[keyof Caches],
  holds: Caches[typeof manager['name']][1],
) => typeof manager['prototype'] extends DataManager<infer K, infer V, any> ? Collection<K, V> : never;

export type CacheWithLimitsOptions = {
  [K in keyof Caches]?: Caches[K][0]['prototype'] extends DataManager<infer K, infer V, any>
    ? LimitedCollectionOptions<K, V> | number
    : never;
};

/**
 * Options for creating a channel using {@link CategoryChannel.createChannel}.
 */
export interface CategoryCreateChannelOptions {
  /**
   * Permission overwrites of the new channel
   */
  permissionOverwrites?: OverwriteResolvable[] | Collection<Snowflake, OverwriteResolvable>;

  /**
   * The topic for the new channel
   */
  topic?: string;

  /**
   * The type of the new channel.
   */
  type?: ExcludeEnum<
    typeof ChannelTypes,
    | 'DM'
    | 'GROUP_DM'
    | 'UNKNOWN'
    | 'GUILD_PUBLIC_THREAD'
    | 'GUILD_NEWS_THREAD'
    | 'GUILD_PRIVATE_THREAD'
    | 'GUILD_CATEGORY'
  >;

  /**
   * Whether the new channel is NSFW
   */
  nsfw?: boolean;

  /**
   * Bitrate of the new channel in bits (only voice)
   */
  bitrate?: number;

  /**
   * Maximum amount of users allowed in the new channel (only voice)
   */
  userLimit?: number;

  /**
   * The rate limit per user (slowmode) for the new channel in seconds
   */
  rateLimitPerUser?: number;

  /**
   * Position of the new channel
   */
  position?: number;

  /**
   * The specific region of the new channel.
   */
  rtcRegion?: string;

  /**
   * Reason for creating the new channel
   */
  reason?: string;
}

export interface ChannelCreationOverwrites {
  allow?: PermissionResolvable;
  deny?: PermissionResolvable;
  id: RoleResolvable | UserResolvable;
}

/**
 * The data for a guild channel.
 */
export interface ChannelData {
  /**
   * The name of the channel
   */
  name?: string;

  /**
   * The type of the channel (only conversion between text and news is supported)
   */
  type?: Pick<typeof ChannelTypes, 'GUILD_TEXT' | 'GUILD_NEWS'>;

  /**
   * The position of the channel
   */
  position?: number;

  /**
   * The topic of the text channel
   */
  topic?: string;

  /**
   * Whether the channel is NSFW
   */
  nsfw?: boolean;

  /**
   * The bitrate of the voice channel
   */
  bitrate?: number;

  /**
   * The user limit of the voice channel
   */
  userLimit?: number;

  /**
   * The parent of the channel
   */
  parent?: CategoryChannelResolvable | null;

  /**
   * The rate limit per user (slowmode) for the channel in seconds
   */
  rateLimitPerUser?: number;

  /**
   * Lock the permissions of the channel to what the parent's permissions are
   */
  lockPermissions?: boolean;

  /**
   * Permission overwrites for the channel
   */
  permissionOverwrites?: readonly OverwriteResolvable[] | Collection<Snowflake, OverwriteResolvable>;

  /**
   * The default auto archive duration for all new threads in this channel
   */
  defaultAutoArchiveDuration?: ThreadAutoArchiveDuration;

  /**
   * The RTC region of the channel
   */
  rtcRegion?: string | null;
}

/**
 * The parameters to pass in when requesting previous messages from a channel. `around`, `before` and
 * `after` are mutually exclusive. All the parameters are optional.
 */
export interface ChannelLogsQueryOptions {
  /**
   * Number of messages to acquire
   */
  limit?: number;

  /**
   * The message's id to get the messages that were posted before it
   */
  before?: Snowflake;

  /**
   * The message's id to get the messages that were posted after it
   */
  after?: Snowflake;

  /**
   * The message's id to get the messages that were posted around it
   */
  around?: Snowflake;
}

export type ChannelMention = `<#${Snowflake}>`;

/**
 * The data needed for updating a channel's position.
 */
export interface ChannelPosition {
  /**
   * Channel to update
   */
  channel: NonThreadGuildBasedChannel | Snowflake;

  /**
   * If the overwrites should be locked to the parents overwrites
   */
  lockPermissions?: boolean;

  /**
   * Parent channel for this channel
   */
  parent?: CategoryChannelResolvable | null;

  /**
   * New position for the channel
   */
  position?: number;
}

/**
 * Data that can be resolved to a GuildTextChannel object.
 */
export type GuildTextChannelResolvable = TextChannel | NewsChannel | Snowflake;

/**
 * Data that can be resolved to give a Channel object.
 */
export type ChannelResolvable = AnyChannel | Snowflake;

/**
 * Options used to create a {@link Webhook} in a {@link TextChannel} or a {@link NewsChannel}.
 */
export interface ChannelWebhookCreateOptions {
  /**
   * Avatar for the webhook
   */
  avatar?: BufferResolvable | Base64Resolvable | null;

  /**
   * Reason for creating the webhook
   */
  reason?: string;
}

export interface BaseClientEvents {
  /**
   * Emitted after every API request has received a response.
   * This event does not necessarily correlate to completion of the request, e.g. when hitting a rate limit.
   * <info>This is an informational event that is emitted quite frequently,
   * it is highly recommended to check `request.path` to filter the data.</info>
   * @param request The request that triggered this response
   * @param response The response received from the Discord API
   */
  apiResponse: [request: APIRequest, response: Response];

  /**
   * Emitted before every API request.
   * This event can emit several times for the same request, e.g. when hitting a rate limit.
   * <info>This is an informational event that is emitted quite frequently,
   * it is highly recommended to check `request.path` to filter the data.</info>
   * @param request The request that is about to be sent
   */
  apiRequest: [request: APIRequest];

  /**
   * Emitted for general debugging information.
   * @param message The debug information
   */
  debug: [message: string];

  /**
   * Emitted when the client hits a rate limit while making a request
   * @param rateLimitData Object containing the rate limit info
   */
  rateLimit: [rateLimitData: RateLimitData];

  /**
   * Emitted periodically when the process sends invalid requests to let users avoid the
   * 10k invalid requests in 10 minutes threshold that causes a ban
   * @param invalidRequestWarningData Object containing the invalid request info
   */
  invalidRequestWarning: [invalidRequestWarningData: InvalidRequestWarningData];
}

export interface ClientEvents extends BaseClientEvents {
  /**
   * Emitted when a guild application command is created.
   * @param command The command which was created
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  applicationCommandCreate: [command: ApplicationCommand];

  /**
   * Emitted when a guild application command is deleted.
   * @param command The command which was deleted
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  applicationCommandDelete: [command: ApplicationCommand];

  /**
   * Emitted when a guild application command is updated.
   * @param oldCommand The command before the update
   * @param newCommand The command after the update
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  applicationCommandUpdate: [oldCommand: ApplicationCommand | null, newCommand: ApplicationCommand];

  cacheSweep: [message: string];

  /**
   * Emitted whenever a guild channel is created.
   * @param channel The channel that was created
   */
  channelCreate: [channel: NonThreadGuildBasedChannel];

  /**
   * Emitted whenever a channel is deleted.
   * @param channel The channel that was deleted
   */
  channelDelete: [channel: DMChannel | NonThreadGuildBasedChannel];

  /**
   * Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event,
   * not much information can be provided easily here - you need to manually check the pins yourself.
   * @param channel The channel that the pins update occurred in
   * @param date The time of the pins update
   */
  channelPinsUpdate: [channel: TextBasedChannel, date: Date];

  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change, channel type change.
   * @param oldChannel The channel before the update
   * @param newChannel The channel after the update
   */
  channelUpdate: [
    oldChannel: DMChannel | NonThreadGuildBasedChannel,
    newChannel: DMChannel | NonThreadGuildBasedChannel,
  ];

  /**
   * Emitted for general warnings.
   * @param message The warning
   */
  warn: [message: string];

  /**
   * Emitted whenever a custom emoji is created in a guild.
   * @param emoji The emoji that was created
   */
  emojiCreate: [emoji: GuildEmoji];

  /**
   * Emitted whenever a custom emoji is deleted in a guild.
   * @param emoji The emoji that was deleted
   */
  emojiDelete: [emoji: GuildEmoji];

  /**
   * Emitted whenever a custom emoji is updated in a guild.
   * @param oldEmoji The old emoji
   * @param newEmoji The new emoji
   */
  emojiUpdate: [oldEmoji: GuildEmoji, newEmoji: GuildEmoji];

  /**
   * Emitted when the client encounters an error.
   * @param error The error encountered
   */
  error: [error: Error];

  /**
   * Emitted whenever a member is banned from a guild.
   * @param ban The ban that occurred
   */
  guildBanAdd: [ban: GuildBan];

  /**
   * Emitted whenever a member is unbanned from a guild.
   * @param ban The ban that was removed
   */
  guildBanRemove: [ban: GuildBan];

  /**
   * Emitted whenever the client joins a guild.
   * @param guild The created guild
   */
  guildCreate: [guild: Guild];

  /**
   * Emitted whenever a guild kicks the client or the guild is deleted/left.
   * @param guild The guild that was deleted
   */
  guildDelete: [guild: Guild];

  /**
   * Emitted whenever a guild becomes unavailable, likely due to a server outage.
   * @param guild The guild that has become unavailable
   */
  guildUnavailable: [guild: Guild];

  /**
   * Emitted whenever a guild integration is updated
   * @param guild The guild whose integrations were updated
   */
  guildIntegrationsUpdate: [guild: Guild];

  /**
   * Emitted whenever a user joins a guild.
   * @param member The member that has joined a guild
   */
  guildMemberAdd: [member: GuildMember];

  /**
   * Emitted whenever a member becomes available in a large guild.
   * @param member The member that became available
   */
  guildMemberAvailable: [member: GuildMember | PartialGuildMember];

  /**
   * Emitted whenever a member leaves a guild, or is kicked.
   * @param member The member that has left/been kicked from the guild
   */
  guildMemberRemove: [member: GuildMember | PartialGuildMember];

  /**
   * Emitted whenever a chunk of guild members is received (all members come from the same guild).
   * @param members The members in the chunk
   * @param guild The guild related to the member chunk
   * @param chunk Properties of the received chunk
   */
  guildMembersChunk: [
    members: Collection<Snowflake, GuildMember>,
    guild: Guild,
    data: { count: number; index: number; nonce: string | undefined },
  ];

  /**
   * Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
   * @param oldMember The member before the update
   * @param newMember The member after the update
   */
  guildMemberUpdate: [oldMember: GuildMember | PartialGuildMember, newMember: GuildMember];

  /**
   * Emitted whenever a guild is updated - e.g. name change.
   * @param oldGuild The guild before the update
   * @param newGuild The guild after the update
   */
  guildUpdate: [oldGuild: Guild, newGuild: Guild];

  /**
   * Emitted when an invite is created.
   * <info> This event only triggers if the client has `MANAGE_GUILD` permissions for the guild,
   * or `MANAGE_CHANNELS` permissions for the channel.</info>
   * @param invite The invite that was created
   */
  inviteCreate: [invite: Invite];

  /**
   * Emitted when an invite is deleted.
   * <info> This event only triggers if the client has `MANAGE_GUILD` permissions for the guild,
   * or `MANAGE_CHANNELS` permissions for the channel.</info>
   * @param invite The invite that was deleted
   */
  inviteDelete: [invite: Invite];

  /**
   * Emitted whenever a message is created.
   * @param message The created message
   * @deprecated Use {@link ClientEvents.messageCreate} instead
   */
  message: [message: Message];

  /**
   * Emitted whenever a message is created.
   * @param message The created message
   */
  messageCreate: [message: Message];

  /**
   * Emitted whenever a message is deleted.
   * @param message The deleted message
   */
  messageDelete: [message: Message | PartialMessage];

  /**
   * Emitted whenever all reactions are removed from a cached message.
   * @param message The message the reactions were removed from
   * @param reactions The cached message reactions that were removed.
   */
  messageReactionRemoveAll: [
    message: Message | PartialMessage,
    reactions: Collection<string | Snowflake, MessageReaction>,
  ];

  /**
   * Emitted when a bot removes an emoji reaction from a cached message.
   * @param reaction The reaction that was removed
   */
  messageReactionRemoveEmoji: [reaction: MessageReaction | PartialMessageReaction];

  /**
   * Emitted whenever messages are deleted in bulk.
   * @param messages The deleted messages, mapped by their id
   */
  messageDeleteBulk: [messages: Collection<Snowflake, Message | PartialMessage>];

  /**
   * Emitted whenever a reaction is added to a cached message.
   * @param messageReaction The reaction object
   * @param user The user that applied the guild or reaction emoji
   */
  messageReactionAdd: [reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser];

  /**
   * Emitted whenever a reaction is removed from a cached message.
   * @param messageReaction The reaction object
   * @param user The user whose emoji or reaction emoji was removed
   */
  messageReactionRemove: [reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser];

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   * @param oldMessage The message before the update
   * @param newMessage The message after the update
   */
  messageUpdate: [oldMessage: Message | PartialMessage, newMessage: Message | PartialMessage];

  /**
   * Emitted whenever a guild member's presence (e.g. status, activity) is changed.
   * @param oldPresence The presence before the update, if one at all
   * @param newPresence The presence after the update
   */
  presenceUpdate: [oldPresence: Presence | null, newPresence: Presence];

  /**
   * Emitted when the client hits a rate limit while making a request
   * @param rateLimitData Object containing the rate limit info
   */
  rateLimit: [rateLimitData: RateLimitData];

  /**
   * Emitted periodically when the process sends invalid requests to let users avoid the
   * 10k invalid requests in 10 minutes threshold that causes a ban
   * @param invalidRequestWarningData Object containing the invalid request info
   */
  invalidRequestWarning: [invalidRequestWarningData: InvalidRequestWarningData];

  /**
   * Emitted when the client becomes ready to start working.
   * @param client The client
   */
  ready: [client: Client<true>];

  /**
   * Emitted when the client's session becomes invalidated.
   * You are expected to handle closing the process gracefully and preventing a boot loop
   * if you are listening to this event.
   */
  invalidated: [];

  /**
   * Emitted whenever a role is created.
   * @param role The role that was created
   */
  roleCreate: [role: Role];

  /**
   * Emitted whenever a guild role is deleted.
   * @param role The role that was deleted
   */
  roleDelete: [role: Role];

  /**
   * Emitted whenever a guild role is updated.
   * @param oldRole The role before the update
   * @param newRole The role after the update
   */
  roleUpdate: [oldRole: Role, newRole: Role];

  /**
   * Emitted whenever a thread is created or when the client user is added to a thread.
   * @param thread The thread that was created
   */
  threadCreate: [thread: ThreadChannel];

  /**
   * Emitted whenever a thread is deleted.
   * @param thread The thread that was deleted
   */
  threadDelete: [thread: ThreadChannel];

  /**
   * Emitted whenever the client user gains access to a text or news channel that contains threads
   * @param threads The threads that were synced
   */
  threadListSync: [threads: Collection<Snowflake, ThreadChannel>];

  /**
   * Emitted whenever the client user's thread member is updated.
   * @param oldMember The member before the update
   * @param newMember The member after the update
   */
  threadMemberUpdate: [oldMember: ThreadMember, newMember: ThreadMember];

  /**
   * Emitted whenever members are added or removed from a thread. Requires `GUILD_MEMBERS` privileged intent
   * @param oldMembers The members before the update
   * @param newMembers The members after the update
   */
  threadMembersUpdate: [
    oldMembers: Collection<Snowflake, ThreadMember>,
    newMembers: Collection<Snowflake, ThreadMember>,
  ];

  /**
   * Emitted whenever a thread is updated - e.g. name change, archive state change, locked state change.
   * @param oldThread The thread before the update
   * @param newThread The thread after the update
   */
  threadUpdate: [oldThread: ThreadChannel, newThread: ThreadChannel];

  /**
   * Emitted whenever a user starts typing in a channel.
   * @param typing The typing state
   */
  typingStart: [typing: Typing];

  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * Triggered by the Discord gateway events USER_UPDATE, GUILD_MEMBER_UPDATE, and PRESENCE_UPDATE.
   * @param oldUser The user before the update
   * @param newUser The user after the update
   */
  userUpdate: [oldUser: User | PartialUser, newUser: User];

  /**
   * Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   * @param oldState The voice state before the update
   * @param newState The voice state after the update
   */
  voiceStateUpdate: [oldState: VoiceState, newState: VoiceState];

  /**
   * Emitted whenever a channel has its webhooks changed.
   * @param channel The channel that had a webhook update
   */
  webhookUpdate: [channel: TextChannel | NewsChannel];

  /**
   * Emitted when an interaction is created.
   * @param interaction The interaction which was created
   * @deprecated Use {@link ClientEvents.interactionCreate} instead
   */
  interaction: [interaction: Interaction];

  /**
   * Emitted when an interaction is created.
   * @param interaction The interaction which was created
   */
  interactionCreate: [interaction: Interaction];

  /**
   * Emitted when a shard's WebSocket disconnects and will no longer reconnect.
   * @param event The WebSocket close event
   * @param id The shard id that disconnected
   */
  shardDisconnect: [closeEvent: CloseEvent, shardId: number];

  /**
   * Emitted whenever a shard's WebSocket encounters a connection error.
   * @param error The encountered error
   * @param shardId The shard that encountered this error
   */
  shardError: [error: Error, shardId: number];

  /**
   * Emitted when a shard turns ready.
   * @param id The shard id that turned ready
   * @param unavailableGuilds Set of unavailable guild ids, if any
   */
  shardReady: [shardId: number, unavailableGuilds: Set<Snowflake> | undefined];

  /**
   * Emitted when a shard is attempting to reconnect or re-identify.
   * @param id The shard id that is attempting to reconnect
   */
  shardReconnecting: [shardId: number];

  /**
   * Emitted when a shard resumes successfully.
   * @param id The shard id that resumed
   * @param replayedEvents The amount of replayed events
   */
  shardResume: [shardId: number, replayedEvents: number];

  /**
   * Emitted whenever a stage instance is created.
   * @param stageInstance The created stage instance
   */
  stageInstanceCreate: [stageInstance: StageInstance];

  /**
   * Emitted whenever a stage instance gets updated - e.g. change in topic or privacy level
   * @param oldStageInstance The stage instance before the update
   * @param newStageInstance The stage instance after the update
   */
  stageInstanceUpdate: [oldStageInstance: StageInstance | null, newStageInstance: StageInstance];

  /**
   * Emitted whenever a stage instance is deleted.
   * @param stageInstance The deleted stage instance
   */
  stageInstanceDelete: [stageInstance: StageInstance];

  /**
   * Emitted whenever a custom sticker is created in a guild.
   * @param sticker The sticker that was created
   */
  stickerCreate: [sticker: Sticker];

  /**
   * Emitted whenever a custom sticker is deleted in a guild.
   * @param sticker The sticker that was deleted
   */
  stickerDelete: [sticker: Sticker];

  /**
   * Emitted whenever a custom sticker is updated in a guild.
   * @param oldSticker The old sticker
   * @param newSticker The new sticker
   */
  stickerUpdate: [oldSticker: Sticker, newSticker: Sticker];

  /**
   * Emitted whenever a guild scheduled event is created.
   * @param guildScheduledEvent The created guild scheduled event
   */
  guildScheduledEventCreate: [guildScheduledEvent: GuildScheduledEvent];

  /**
   * Emitted whenever a guild scheduled event gets updated.
   * @param oldGuildScheduledEvent The guild scheduled event object before the update
   * @param newGuildScheduledEvent The guild scheduled event object after the update
   */
  guildScheduledEventUpdate: [oldGuildScheduledEvent: GuildScheduledEvent, newGuildScheduledEvent: GuildScheduledEvent];

  /**
   * Emitted whenever a guild scheduled event is deleted.
   * @param guildScheduledEvent The deleted guild scheduled event
   */
  guildScheduledEventDelete: [guildScheduledEvent: GuildScheduledEvent];

  /**
   * Emitted whenever a user subscribes to a guild scheduled event
   * @param guildScheduledEvent The guild scheduled event
   * @param user The user who subscribed
   */
  guildScheduledEventUserAdd: [guildScheduledEvent: GuildScheduledEvent, user: User];

  /**
   * Emitted whenever a user unsubscribes from a guild scheduled event
   * @param guildScheduledEvent The guild scheduled event
   * @param user The user who unsubscribed
   */
  guildScheduledEventUserRemove: [guildScheduledEvent: GuildScheduledEvent, user: User];
}

/**
 * Options used when fetching an invite from Discord.
 */
export interface ClientFetchInviteOptions {
  /**
   * The id of the guild scheduled event to include with the invite
   */
  guildScheduledEventId?: Snowflake;
}

/**
 * Options for a client.
 */
export interface ClientOptions {
  /**
   * The shard's id to run, or an array of shard ids. If not specified, the client will spawn
   * {@link ClientOptions.shardCount} shards. If set to `auto`, it will fetch the recommended amount of shards
   * from Discord and spawn that amount
   */
  shards?: number | number[] | 'auto';

  /**
   * The total amount of shards used by all processes of this bot
   * (e.g. recommended shard count, shard count of the ShardingManager)
   */
  shardCount?: number;

  /**
   * Function to create a cache. You can use your own function, or the {@link Options} class to customize the
   * Collection used for the cache. <warn>Overriding the cache used in `GuildManager`, `ChannelManager`,
   * `GuildChannelManager`, `RoleManager`, and `PermissionOverwriteManager` is unsupported and **will** break
   * functionality</warn>
   */
  makeCache?: CacheFactory;

  /**
   * How long a message should stay in the cache until it is considered sweepable (in seconds, 0 for forever)
   * @deprecated Pass the value of this property as `lifetime` to `sweepers.messages` instead.
   */
  messageCacheLifetime?: number;

  /**
   * How frequently to remove messages from the cache that are older than the message cache lifetime (in seconds, 0 for never)
   * @deprecated Pass the value of this property as `interval` to `sweepers.messages` instead.
   */
  messageSweepInterval?: number;

  /**
   * Default value for {@link MessageOptions.allowedMentions}
   */
  allowedMentions?: MessageMentionOptions;

  /**
   * The number of invalid REST requests (those that return 401, 403, or 429) in a 10 minute window between
   * emitted warnings (0 for no warnings). That is, if set to 500, warnings will be emitted at invalid request
   * number 500, 1000, 1500, and so on.
   */
  invalidRequestWarningInterval?: number;

  /**
   * Structures allowed to be partial. This means events can be emitted even when they're missing all the data
   * for a particular structure. See the "Partial Structures" topic on the
   * [guide](https://discordjs.guide/popular-topics/partials.html) for some important usage information, as
   * partials require you to put checks in place when handling data.
   */
  partials?: PartialTypes[];

  /**
   * Maximum time permitted between REST responses and their corresponding WebSocket events
   */
  restWsBridgeTimeout?: number;

  /**
   * Extra time in milliseconds to wait before continuing to make REST
   * requests (higher values will reduce rate-limiting errors on bad connections)
   */
  restTimeOffset?: number;

  /**
   * Time to wait before cancelling a REST request, in milliseconds
   */
  restRequestTimeout?: number;

  /**
   * How many requests to allow sending per second (0 for unlimited, 50 for the standard global limit used by Discord)
   */
  restGlobalRateLimit?: number;

  /**
   * How frequently to delete inactive request buckets, in seconds (or 0 for never)
   */
  restSweepInterval?: number;

  /**
   * How many times to retry on 5XX errors (Infinity for an indefinite amount of retries)
   */
  retryLimit?: number;

  /**
   * Default value for {@link ReplyMessageOptions.failIfNotExists}
   */
  failIfNotExists?: boolean;

  /**
   * An array of additional bot info to be appended to the end of the required
   * [User Agent](https://discord.com/developers/docs/reference#user-agent) header
   */
  userAgentSuffix?: string[];

  /**
   * Presence data to use upon login
   */
  presence?: PresenceData;

  /**
   * Intents to enable for this connection
   */
  intents: BitFieldResolvable<IntentsString, number>;

  /**
   * Time in milliseconds that Clients with the GUILDS intent should wait for
   * missing guilds to be recieved before starting the bot. If not specified, the default is 15 seconds.
   */
  waitGuildTimeout?: number;

  /**
   * Options for cache sweeping
   */
  sweepers?: SweeperOptions;

  /**
   * Options for the WebSocket
   */
  ws?: WebSocketOptions;

  /**
   * HTTP options
   */
  http?: HTTPOptions;

  /**
   * Decides how rate limits and pre-emptive throttles should be handled. If this option is an array containing
   * the prefix of the request route (e.g. /channels to match any route starting with /channels, such as
   * /channels/222197033908436994/messages) or a function returning true, a {@link RateLimitError} will be thrown.
   * Otherwise the request will be queued for later
   */
  rejectOnRateLimit?: string[] | ((data: RateLimitData) => boolean | Promise<boolean>);
}

/**
 * The status of this presence:
 * * **`online`** - user is online
 * * **`idle`** - user is AFK
 * * **`dnd`** - user is in Do Not Disturb
 */
export type ClientPresenceStatus = 'online' | 'idle' | 'dnd';

export interface ClientPresenceStatusData {
  web?: ClientPresenceStatus;
  mobile?: ClientPresenceStatus;
  desktop?: ClientPresenceStatus;
}

/**
 * Data used to edit the logged in client
 */
export interface ClientUserEditData {
  /**
   * The new username
   */
  username?: string;

  /**
   * The new avatar
   */
  avatar?: BufferResolvable | Base64Resolvable | null;
}

/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent}
 */
export interface CloseEvent {
  wasClean: boolean;
  code: number;
  reason: string;
  target: WebSocket;
}

/**
 * Filter to be applied to the collector.
 * @param args Any arguments received by the listener
 * @param collection The items collected by this collector
 */
export type CollectorFilter<T extends unknown[]> = (...args: T) => boolean | Promise<boolean>;

/**
 * Options to be applied to the collector.
 */
export interface CollectorOptions<T extends unknown[]> {
  /**
   * The filter applied to this collector
   */
  filter?: CollectorFilter<T>;

  /**
   * How long to run the collector for in milliseconds
   */
  time?: number;

  /**
   * How long to stop the collector after inactivity in milliseconds
   */
  idle?: number;

  /**
   * Whether to dispose data when it's deleted
   */
  dispose?: boolean;
}

/**
 * Options used to reset the timeout and idle timer of a {@link Collector}.
 */
export interface CollectorResetTimerOptions {
  /**
   * How long to run the collector for (in milliseconds)
   */
  time?: number;

  /**
   * How long to wait to stop the collector after inactivity (in milliseconds)
   */
  idle?: number;
}

/**
 * Can be a number, hex string, an RGB array
 */
export type ColorResolvable =
  | 'DEFAULT'
  | 'WHITE'
  | 'AQUA'
  | 'GREEN'
  | 'BLUE'
  | 'YELLOW'
  | 'PURPLE'
  | 'LUMINOUS_VIVID_PINK'
  | 'FUCHSIA'
  | 'GOLD'
  | 'ORANGE'
  | 'RED'
  | 'GREY'
  | 'DARKER_GREY'
  | 'NAVY'
  | 'DARK_AQUA'
  | 'DARK_GREEN'
  | 'DARK_BLUE'
  | 'DARK_PURPLE'
  | 'DARK_VIVID_PINK'
  | 'DARK_GOLD'
  | 'DARK_ORANGE'
  | 'DARK_RED'
  | 'DARK_GREY'
  | 'LIGHT_GREY'
  | 'DARK_NAVY'
  | 'BLURPLE'
  | 'GREYPLE'
  | 'DARK_BUT_NOT_BLACK'
  | 'NOT_QUITE_BLACK'
  | 'RANDOM'
  | readonly [number, number, number]
  | number
  | HexColorString;

/**
 * Represents an option of a received command interaction.
 */
export interface CommandInteractionOption<Cached extends CacheType = CacheType> {
  /**
   * The name of the option
   */
  name: string;

  /**
   * The type of the option
   */
  type: ApplicationCommandOptionType;

  /**
   * The value of the option
   */
  value?: string | number | boolean;

  /**
   * Whether the option is focused
   */
  focused?: boolean;

  /**
   * Whether the option is an autocomplete option
   */
  autocomplete?: boolean;

  /**
   * Additional options if this option is a subcommand (group)
   */
  options?: CommandInteractionOption[];

  /**
   * The resolved user
   */
  user?: User;

  /**
   * The resolved member
   */
  member?: CacheTypeReducer<Cached, GuildMember, APIInteractionDataResolvedGuildMember>;

  /**
   * The resolved channel
   */
  channel?: CacheTypeReducer<Cached, GuildBasedChannel, APIInteractionDataResolvedChannel>;

  /**
   * The resolved role
   */
  role?: CacheTypeReducer<Cached, Role, APIRole>;

  /**
   * The resolved message
   */
  message?: GuildCacheMessage<Cached>;
}

/**
 * Represents the resolved data of a received command interaction.
 */
export interface CommandInteractionResolvedData<Cached extends CacheType = CacheType> {
  /**
   * The resolved users
   */
  users?: Collection<Snowflake, User>;

  /**
   * The resolved guild members
   */
  members?: Collection<Snowflake, CacheTypeReducer<Cached, GuildMember, APIInteractionDataResolvedGuildMember>>;

  /**
   * The resolved roles
   */
  roles?: Collection<Snowflake, CacheTypeReducer<Cached, Role, APIRole>>;

  /**
   * The resolved channels
   */
  channels?: Collection<Snowflake, CacheTypeReducer<Cached, AnyChannel, APIInteractionDataResolvedChannel>>;

  /**
   * The resolved messages
   */
  messages?: Collection<Snowflake, CacheTypeReducer<Cached, Message, APIMessage>>;
}

export interface ConstantsClientApplicationAssetTypes {
  SMALL: 1;
  BIG: 2;
}

export interface ConstantsColors {
  DEFAULT: 0x000000;
  WHITE: 0xffffff;
  AQUA: 0x1abc9c;
  GREEN: 0x57f287;
  BLUE: 0x3498db;
  YELLOW: 0xfee75c;
  PURPLE: 0x9b59b6;
  LUMINOUS_VIVID_PINK: 0xe91e63;
  FUCHSIA: 0xeb459e;
  GOLD: 0xf1c40f;
  ORANGE: 0xe67e22;
  RED: 0xed4245;
  GREY: 0x95a5a6;
  NAVY: 0x34495e;
  DARK_AQUA: 0x11806a;
  DARK_GREEN: 0x1f8b4c;
  DARK_BLUE: 0x206694;
  DARK_PURPLE: 0x71368a;
  DARK_VIVID_PINK: 0xad1457;
  DARK_GOLD: 0xc27c0e;
  DARK_ORANGE: 0xa84300;
  DARK_RED: 0x992d22;
  DARK_GREY: 0x979c9f;
  DARKER_GREY: 0x7f8c8d;
  LIGHT_GREY: 0xbcc0c0;
  DARK_NAVY: 0x2c3e50;
  BLURPLE: 0x5865f2;
  GREYPLE: 0x99aab5;
  DARK_BUT_NOT_BLACK: 0x2c2f33;
  NOT_QUITE_BLACK: 0x23272a;
}

export interface ConstantsEvents {
  /**
   * Emitted when the client hits a rate limit while making a request
   */
  RATE_LIMIT: 'rateLimit';

  /**
   * Emitted periodically when the process sends invalid requests to let users avoid the
   * 10k invalid requests in 10 minutes threshold that causes a ban
   */
  INVALID_REQUEST_WARNING: 'invalidRequestWarning';

  /**
   * Emitted after every API request has received a response.
   * This event does not necessarily correlate to completion of the request, e.g. when hitting a rate limit.
   * <info>This is an informational event that is emitted quite frequently,
   * it is highly recommended to check `request.path` to filter the data.</info>
   */
  API_RESPONSE: 'apiResponse';

  /**
   * Emitted before every API request.
   * This event can emit several times for the same request, e.g. when hitting a rate limit.
   * <info>This is an informational event that is emitted quite frequently,
   * it is highly recommended to check `request.path` to filter the data.</info>
   */
  API_REQUEST: 'apiRequest';

  /**
   * Emitted when the client becomes ready to start working.
   */
  CLIENT_READY: 'ready';

  /**
   * Emitted when a guild application command is created.
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  APPLICATION_COMMAND_CREATE: 'applicationCommandCreate';

  /**
   * Emitted when a guild application command is deleted.
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  APPLICATION_COMMAND_DELETE: 'applicationCommandDelete';

  /**
   * Emitted when a guild application command is updated.
   * @deprecated See {@link https://github.com/discord/discord-api-docs/issues/3690 this issue} for more information.
   */
  APPLICATION_COMMAND_UPDATE: 'applicationCommandUpdate';

  /**
   * Emitted whenever the client joins a guild.
   */
  GUILD_CREATE: 'guildCreate';

  /**
   * Emitted whenever a guild kicks the client or the guild is deleted/left.
   */
  GUILD_DELETE: 'guildDelete';

  /**
   * Emitted whenever a guild is updated - e.g. name change.
   */
  GUILD_UPDATE: 'guildUpdate';

  /**
   * Emitted when an invite is created.
   * <info> This event only triggers if the client has `MANAGE_GUILD` permissions for the guild,
   * or `MANAGE_CHANNELS` permissions for the channel.</info>
   */
  INVITE_CREATE: 'inviteCreate';

  /**
   * Emitted when an invite is deleted.
   * <info> This event only triggers if the client has `MANAGE_GUILD` permissions for the guild,
   * or `MANAGE_CHANNELS` permissions for the channel.</info>
   */
  INVITE_DELETE: 'inviteDelete';

  /**
   * Emitted whenever a guild becomes unavailable, likely due to a server outage.
   */
  GUILD_UNAVAILABLE: 'guildUnavailable';

  /**
   * Emitted whenever a user joins a guild.
   */
  GUILD_MEMBER_ADD: 'guildMemberAdd';

  /**
   * Emitted whenever a member leaves a guild, or is kicked.
   */
  GUILD_MEMBER_REMOVE: 'guildMemberRemove';

  /**
   * Emitted whenever a guild member changes - i.e. new role, removed role, nickname.
   */
  GUILD_MEMBER_UPDATE: 'guildMemberUpdate';

  /**
   * Emitted whenever a member becomes available in a large guild.
   */
  GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable';

  /**
   * Emitted whenever a chunk of guild members is received (all members come from the same guild).
   */
  GUILD_MEMBERS_CHUNK: 'guildMembersChunk';

  /**
   * Emitted whenever a guild integration is updated
   */
  GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate';

  /**
   * Emitted whenever a role is created.
   */
  GUILD_ROLE_CREATE: 'roleCreate';

  /**
   * Emitted whenever a guild role is deleted.
   */
  GUILD_ROLE_DELETE: 'roleDelete';

  /**
   * Emitted whenever a guild role is updated.
   */
  GUILD_ROLE_UPDATE: 'roleUpdate';

  /**
   * Emitted whenever a custom emoji is created in a guild.
   */
  GUILD_EMOJI_CREATE: 'emojiCreate';

  /**
   * Emitted whenever a custom emoji is deleted in a guild.
   */
  GUILD_EMOJI_DELETE: 'emojiDelete';

  /**
   * Emitted whenever a custom emoji is updated in a guild.
   */
  GUILD_EMOJI_UPDATE: 'emojiUpdate';

  /**
   * Emitted whenever a member is banned from a guild.
   */
  GUILD_BAN_ADD: 'guildBanAdd';

  /**
   * Emitted whenever a member is unbanned from a guild.
   */
  GUILD_BAN_REMOVE: 'guildBanRemove';

  /**
   * Emitted whenever a guild channel is created.
   */
  CHANNEL_CREATE: 'channelCreate';

  /**
   * Emitted whenever a channel is deleted.
   */
  CHANNEL_DELETE: 'channelDelete';

  /**
   * Emitted whenever a channel is updated - e.g. name change, topic change, channel type change.
   */
  CHANNEL_UPDATE: 'channelUpdate';

  /**
   * Emitted whenever the pins of a channel are updated. Due to the nature of the WebSocket event,
   * not much information can be provided easily here - you need to manually check the pins yourself.
   */
  CHANNEL_PINS_UPDATE: 'channelPinsUpdate';

  /**
   * Emitted whenever a message is created.
   */
  MESSAGE_CREATE: 'messageCreate';

  /**
   * Emitted whenever a message is deleted.
   */
  MESSAGE_DELETE: 'messageDelete';

  /**
   * Emitted whenever a message is updated - e.g. embed or content change.
   */
  MESSAGE_UPDATE: 'messageUpdate';

  /**
   * Emitted whenever messages are deleted in bulk.
   */
  MESSAGE_BULK_DELETE: 'messageDeleteBulk';

  /**
   * Emitted whenever a reaction is added to a cached message.
   */
  MESSAGE_REACTION_ADD: 'messageReactionAdd';

  /**
   * Emitted whenever a reaction is removed from a cached message.
   */
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove';

  /**
   * Emitted whenever all reactions are removed from a cached message.
   */
  MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll';

  /**
   * Emitted when a bot removes an emoji reaction from a cached message.
   */
  MESSAGE_REACTION_REMOVE_EMOJI: 'messageReactionRemoveEmoji';

  /**
   * Emitted whenever a thread is created or when the client user is added to a thread.
   */
  THREAD_CREATE: 'threadCreate';

  /**
   * Emitted whenever a thread is deleted.
   */
  THREAD_DELETE: 'threadDelete';

  /**
   * Emitted whenever a thread is updated - e.g. name change, archive state change, locked state change.
   */
  THREAD_UPDATE: 'threadUpdate';

  /**
   * Emitted whenever the client user gains access to a text or news channel that contains threads
   */
  THREAD_LIST_SYNC: 'threadListSync';

  /**
   * Emitted whenever the client user's thread member is updated.
   */
  THREAD_MEMBER_UPDATE: 'threadMemberUpdate';

  /**
   * Emitted whenever members are added or removed from a thread. Requires `GUILD_MEMBERS` privileged intent
   */
  THREAD_MEMBERS_UPDATE: 'threadMembersUpdate';

  /**
   * Emitted whenever a user's details (e.g. username) are changed.
   * Triggered by the Discord gateway events USER_UPDATE, GUILD_MEMBER_UPDATE, and PRESENCE_UPDATE.
   */
  USER_UPDATE: 'userUpdate';

  /**
   * Emitted whenever a guild member's presence (e.g. status, activity) is changed.
   */
  PRESENCE_UPDATE: 'presenceUpdate';

  VOICE_SERVER_UPDATE: 'voiceServerUpdate';

  /**
   * Emitted whenever a member changes voice state - e.g. joins/leaves a channel, mutes/unmutes.
   */
  VOICE_STATE_UPDATE: 'voiceStateUpdate';

  /**
   * Emitted whenever a user starts typing in a channel.
   */
  TYPING_START: 'typingStart';

  /**
   * Emitted whenever a channel has its webhooks changed.
   */
  WEBHOOKS_UPDATE: 'webhookUpdate';

  /**
   * Emitted when an interaction is created.
   */
  INTERACTION_CREATE: 'interactionCreate';

  /**
   * Emitted when the client encounters an error.
   */
  ERROR: 'error';

  /**
   * Emitted for general warnings.
   */
  WARN: 'warn';

  /**
   * Emitted for general debugging information.
   */
  DEBUG: 'debug';

  CACHE_SWEEP: 'cacheSweep';

  /**
   * Emitted when a shard's WebSocket disconnects and will no longer reconnect.
   */
  SHARD_DISCONNECT: 'shardDisconnect';

  /**
   * Emitted whenever a shard's WebSocket encounters a connection error.
   */
  SHARD_ERROR: 'shardError';

  /**
   * Emitted when a shard is attempting to reconnect or re-identify.
   */
  SHARD_RECONNECTING: 'shardReconnecting';

  /**
   * Emitted when a shard turns ready.
   */
  SHARD_READY: 'shardReady';

  /**
   * Emitted when a shard resumes successfully.
   */
  SHARD_RESUME: 'shardResume';

  /**
   * Emitted when the client's session becomes invalidated.
   * You are expected to handle closing the process gracefully and preventing a boot loop
   * if you are listening to this event.
   */
  INVALIDATED: 'invalidated';

  RAW: 'raw';

  /**
   * Emitted whenever a stage instance is created.
   */
  STAGE_INSTANCE_CREATE: 'stageInstanceCreate';

  /**
   * Emitted whenever a stage instance gets updated - e.g. change in topic or privacy level
   */
  STAGE_INSTANCE_UPDATE: 'stageInstanceUpdate';

  /**
   * Emitted whenever a stage instance is deleted.
   */
  STAGE_INSTANCE_DELETE: 'stageInstanceDelete';

  /**
   * Emitted whenever a custom sticker is created in a guild.
   */
  GUILD_STICKER_CREATE: 'stickerCreate';

  /**
   * Emitted whenever a custom sticker is deleted in a guild.
   */
  GUILD_STICKER_DELETE: 'stickerDelete';

  /**
   * Emitted whenever a custom sticker is updated in a guild.
   */
  GUILD_STICKER_UPDATE: 'stickerUpdate';

  /**
   * Emitted whenever a guild scheduled event is created.
   */
  GUILD_SCHEDULED_EVENT_CREATE: 'guildScheduledEventCreate';

  /**
   * Emitted whenever a guild scheduled event gets updated.
   */
  GUILD_SCHEDULED_EVENT_UPDATE: 'guildScheduledEventUpdate';

  /**
   * Emitted whenever a guild scheduled event is deleted.
   */
  GUILD_SCHEDULED_EVENT_DELETE: 'guildScheduledEventDelete';

  /**
   * Emitted whenever a user subscribes to a guild scheduled event
   */
  GUILD_SCHEDULED_EVENT_USER_ADD: 'guildScheduledEventUserAdd';

  /**
   * Emitted whenever a user unsubscribes from a guild scheduled event
   */
  GUILD_SCHEDULED_EVENT_USER_REMOVE: 'guildScheduledEventUserRemove';
}

export interface ConstantsOpcodes {
  DISPATCH: 0;
  HEARTBEAT: 1;
  IDENTIFY: 2;
  STATUS_UPDATE: 3;
  VOICE_STATE_UPDATE: 4;
  VOICE_GUILD_PING: 5;
  RESUME: 6;
  RECONNECT: 7;
  REQUEST_GUILD_MEMBERS: 8;
  INVALID_SESSION: 9;
  HELLO: 10;
  HEARTBEAT_ACK: 11;
}

export interface ConstantsShardEvents {
  CLOSE: 'close';
  DESTROYED: 'destroyed';
  INVALID_SESSION: 'invalidSession';
  READY: 'ready';
  RESUMED: 'resumed';
}

export interface ConstantsStatus {
  READY: 0;
  CONNECTING: 1;
  RECONNECTING: 2;
  IDLE: 3;
  NEARLY: 4;
  DISCONNECTED: 5;
}

/**
 * Options used to create an invite URL to a {@link GuildScheduledEvent}
 * @property channel
 */
export interface CreateGuildScheduledEventInviteURLOptions extends CreateInviteOptions {
  /**
   * The channel to create the invite in.
   * <warn>This is required when the `entityType` of `GuildScheduledEvent` is `EXTERNAL`, gets ignored otherwise</warn>
   */
  channel?: GuildInvitableChannelResolvable;
}

/**
 * Options used to create a new role.
 */
export interface CreateRoleOptions extends RoleData {
  /**
   * The reason for creating this role
   */
  reason?: string;
}

/**
 * Options used to create a stage instance.
 */
export interface StageInstanceCreateOptions {
  /**
   * The topic of the stage instance
   */
  topic: string;

  /**
   * The privacy level of the stage instance
   */
  privacyLevel?: PrivacyLevel | number;
}

/**
 * Crossposted channel data.
 */
export interface CrosspostedChannel {
  /**
   * The mentioned channel's id
   */
  channelId: Snowflake;

  /**
   * The id of the guild that has the channel
   */
  guildId: Snowflake;

  /**
   * The channel's type
   */
  type: keyof typeof ChannelTypes;

  /**
   * The channel's name
   */
  name: string;
}

/**
 * Data that can be resolved to a Date object. This can be:
 * * A Date object
 * * A number representing a timestamp
 * * An [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) string
 */
export type DateResolvable = Date | number | string;

/**
 * A deconstructed snowflake.
 */
export interface DeconstructedSnowflake {
  /**
   * Timestamp the snowflake was created
   */
  timestamp: number;

  /**
   * Date the snowflake was created
   */
  readonly date: Date;

  /**
   * The worker's id in the snowflake
   */
  workerId: number;

  /**
   * The process's id in the snowflake
   */
  processId: number;

  /**
   * Increment in the snowflake
   */
  increment: number;

  /**
   * Binary representation of the snowflake
   */
  binary: string;
}

/**
 * The value set for a guild's default message notifications, e.g. `ALL_MESSAGES`.
 * @see {@link [Default Message Notification Level](https://discord.com/developers/docs/resources/guild#guild-object-default-message-notification-level)}
 */
export type DefaultMessageNotificationLevel = keyof typeof DefaultMessageNotificationLevels;

export type DynamicImageFormat = AllowedImageFormat | 'gif';

/**
 * Options used to edit a guild template.
 */
export interface EditGuildTemplateOptions {
  /**
   * The name of this template
   */
  name?: string;

  /**
   * The description of this template
   */
  description?: string;
}

/**
 * The options to provide for setting an author for a {@link MessageEmbed}.
 */
export interface EmbedAuthorData {
  /**
   * The name of this author.
   */
  name: string;

  /**
   * The URL of this author.
   */
  url?: string;

  /**
   * The icon URL of this author.
   */
  iconURL?: string;
}

/**
 * Represents a field of a MessageEmbed
 */
export interface EmbedField {
  /**
   * The name of this field
   */
  name: string;

  /**
   * The value of this field
   */
  value: string;

  /**
   * If this field will be displayed inline
   */
  inline: boolean;
}

export interface EmbedFieldData {
  /**
   * The name of this field
   */
  name: string;

  /**
   * The value of this field
   */
  value: string;

  /**
   * If this field will be displayed inline
   */
  inline?: boolean;
}

/**
 * The options to provide for setting a footer for a {@link MessageEmbed}.
 */
export interface EmbedFooterData {
  /**
   * The text of the footer.
   */
  text: string;

  /**
   * The icon URL of the footer.
   */
  iconURL?: string;
}

/**
 * Data that can be resolved to give an emoji identifier. This can be:
 * * The unicode representation of an emoji
 * * The `<a:name:id>`, `<:name:id>`, `a:name:id` or `name:id` emoji identifier string of an emoji
 * * An EmojiResolvable
 */
export type EmojiIdentifierResolvable = string | EmojiResolvable;

/**
 * Data that can be resolved into a GuildEmoji object.
 */
export type EmojiResolvable = Snowflake | GuildEmoji | ReactionEmoji;

/**
 * @external ErrorEvent
 * @see {@link [ErrorEvent](https://developer.mozilla.org/en-US/docs/Web/API/ErrorEvent)}
 */
export interface ErrorEvent {
  error: unknown;
  message: string;
  type: string;
  target: WebSocket;
}

/**
 * Options used to escape markdown.
 */
export interface EscapeMarkdownOptions {
  /**
   * Whether to escape code blocks or not
   */
  codeBlock?: boolean;

  /**
   * Whether to escape inline code or not
   */
  inlineCode?: boolean;

  /**
   * Whether to escape bolds or not
   */
  bold?: boolean;

  /**
   * Whether to escape italics or not
   */
  italic?: boolean;

  /**
   * Whether to escape underlines or not
   */
  underline?: boolean;

  /**
   * Whether to escape underlines or not
   */
  strikethrough?: boolean;

  /**
   * Whether to escape spoilers or not
   */
  spoiler?: boolean;

  /**
   * Whether to escape text inside inline code or not
   */
  inlineCodeContent?: boolean;

  /**
   * Whether to escape text inside code blocks or not
   */
  codeBlockContent?: boolean;
}

/**
 * The value set for the explicit content filter levels for a guild
 * @see {@link [Explicit Content Filter Level](https://discord.com/developers/docs/resources/guild#guild-object-explicit-content-filter-level)}
 */
export type ExplicitContentFilterLevel = keyof typeof ExplicitContentFilterLevels;

/**
 * An extendable structure:
 */
interface Extendable {
  GuildEmoji: typeof GuildEmoji;
  DMChannel: typeof DMChannel;
  TextChannel: typeof TextChannel;
  VoiceChannel: typeof VoiceChannel;
  CategoryChannel: typeof CategoryChannel;
  NewsChannel: typeof NewsChannel;
  StoreChannel: typeof StoreChannel;
  StageChannel: typeof StageChannel;
  ThreadChannel: typeof ThreadChannel;
  GuildMember: typeof GuildMember;
  ThreadMember: typeof ThreadMember;
  Guild: typeof Guild;
  Message: typeof Message;
  MessageReaction: typeof MessageReaction;
  Presence: typeof Presence;
  ClientPresence: typeof ClientPresence;
  VoiceState: typeof VoiceState;
  Role: typeof Role;
  User: typeof User;
  StageInstance: typeof StageInstance;
  CommandInteraction: typeof CommandInteraction;
  ButtonInteraction: typeof ButtonInteraction;
  SelectMenuInteraction: typeof SelectMenuInteraction;
  MessageContextMenuInteraction: typeof MessageContextMenuInteraction;
  AutocompleteInteraction: typeof AutocompleteInteraction;
  UserContextMenuInteraction: typeof UserContextMenuInteraction;
}

/**
 * Options used to fetch Application Commands from Discord
 */
export interface FetchApplicationCommandOptions extends BaseFetchOptions {
  /**
   * The guild's id to fetch commands for, for when the guild is not cached
   */
  guildId?: Snowflake;
}

/**
 * The options used to fetch archived threads.
 */
export interface FetchArchivedThreadOptions {
  /**
   * The type of threads to fetch, either `public` or `private`
   */
  type?: 'public' | 'private';

  /**
   * Whether to fetch **all** archived threads when type is `private`. Requires `MANAGE_THREADS` if true
   */
  fetchAll?: boolean;

  /**
   * Only return threads that were created before this Date
   * or Snowflake. <warn>Must be a {@link ThreadChannelResolvable} when type is `private` and fetchAll is `false`</warn>
   */
  before?: ThreadChannelResolvable | DateResolvable;

  /**
   * Maximum number of threads to return
   */
  limit?: number;
}

/**
 * Options used to fetch a single ban from a guild.
 */
export interface FetchBanOptions extends BaseFetchOptions {
  /**
   * The ban to fetch
   */
  user: UserResolvable;
}

/**
 * Options used to fetch all bans from a guild.
 */
export interface FetchBansOptions {
  /**
   * Whether or not to cache the fetched bans
   */
  cache: boolean;
}

/**
 * Options for fetching a channel from Discord
 */
export interface FetchChannelOptions extends BaseFetchOptions {
  /**
   * Allows the channel to be returned even if the guild is not in cache,
   * it will not be cached. <warn>Many of the properties and methods on the returned channel will throw errors</warn>
   */
  allowUnknownGuild?: boolean;
}

/**
 * The data returned from a thread fetch that returns multiple threads.
 */
export interface FetchedThreads {
  /**
   * The threads that were fetched, with any members returned
   */
  threads: Collection<Snowflake, ThreadChannel>;

  /**
   * Whether there are potentially additional threads that require a subsequent call
   */
  hasMore?: boolean;
}

/**
 * Options used to fetch a single guild.
 */
export interface FetchGuildOptions extends BaseFetchOptions {
  /**
   * The guild to fetch
   */
  guild: GuildResolvable;

  /**
   * Whether the approximate member and presence counts should be returned
   */
  withCounts?: boolean;
}

/**
 * Options used to fetch multiple guilds.
 */
export interface FetchGuildsOptions {
  /**
   * Get guilds before this guild id
   */
  before?: Snowflake;

  /**
   * Get guilds after this guild id
   */
  after?: Snowflake;

  /**
   * Maximum number of guilds to request (1-200)
   */
  limit?: number;
}

/**
 * Options used to fetch a single guild scheduled event from a guild.
 */
export interface FetchGuildScheduledEventOptions extends BaseFetchOptions {
  /**
   * The guild scheduled event to fetch
   */
  guildScheduledEvent: GuildScheduledEventResolvable;

  /**
   * Whether to fetch the number of users subscribed to the scheduled event
   */
  withUserCount?: boolean;
}

/**
 * Options used to fetch multiple guild scheduled events from a guild.
 */
export interface FetchGuildScheduledEventsOptions {
  /**
   * Whether or not to cache the fetched guild scheduled events
   */
  cache?: boolean;

  /**
   * Whether to fetch the number of users subscribed to each scheduled event should be returned
   */
  withUserCount?: boolean;
}

/**
 * Options used to fetch subscribers of a guild scheduled event
 */
export interface FetchGuildScheduledEventSubscribersOptions {
  /**
   * The maximum numbers of users to fetch
   */
  limit?: number;

  /**
   * Whether to fetch guild member data of the users
   */
  withMember?: boolean;
}

/**
 * Options used to fetch a single invite from a guild.
 */
interface FetchInviteOptions extends BaseFetchOptions {
  /**
   * The invite to fetch
   */
  code: string;
}

/**
 * Options used to fetch all invites from a guild.
 */
interface FetchInvitesOptions {
  /**
   * The channel to fetch all invites from
   */
  channelId?: GuildInvitableChannelResolvable;

  /**
   * Whether or not to cache the fetched invites
   */
  cache?: boolean;
}

/**
 * Options used to fetch a single member from a guild.
 */
export interface FetchMemberOptions extends BaseFetchOptions {
  /**
   * The user to fetch
   */
  user: UserResolvable;
}

/**
 * Options used to fetch multiple members from a guild.
 */
export interface FetchMembersOptions {
  /**
   * The user(s) to fetch
   */
  user?: UserResolvable | UserResolvable[];

  /**
   * Limit fetch to members with similar usernames
   */
  query?: string;

  /**
   * Maximum number of members to request
   */
  limit?: number;

  /**
   * Whether or not to include the presences
   */
  withPresences?: boolean;

  /**
   * Timeout for receipt of members
   */
  time?: number;

  /**
   * Nonce for this request (32 characters max - default to base 16 now timestamp)
   */
  nonce?: string;

  /**
   * Whether to skip the cache check and request the API
   */
  force?: boolean;
}

/**
 * Options used to fetch users who gave a reaction.
 */
export interface FetchReactionUsersOptions {
  /**
   * The maximum amount of users to fetch, defaults to `100`
   */
  limit?: number;

  /**
   * Limit fetching users to those with an id greater than the supplied id
   */
  after?: Snowflake;
}

/**
 * The options for fetching multiple threads, the properties are mutually exclusive
 */
export interface FetchThreadsOptions {
  /**
   * The options used to fetch archived threads
   */
  archived?: FetchArchivedThreadOptions;

  /**
   * When true, fetches active threads. <warn>If `archived` is set, this is ignored!</warn>
   */
  active?: boolean;
}

export interface FileOptions {
  /**
   * File to attach
   */
  attachment: BufferResolvable | Stream;

  /**
   * Filename of the attachment
   */
  name?: string;

  /**
   * The description of the file
   */
  description?: string;
}

/**
 * @returns Return `null` to skip sweeping, otherwise a function passed to `sweep()`,
 * See {@link [Collection.sweep](https://discord.js.org/#/docs/collection/main/class/Collection?scrollTo=sweep)}
 * for the definition of this function.
 */
export type GlobalSweepFilter<K, V> = () => ((value: V, key: K, collection: Collection<K, V>) => boolean) | null;

/**
 * Data used for overwriting the permissions for all application commands in a guild.
 */
export interface GuildApplicationCommandPermissionData {
  /**
   * The command's id
   */
  id: Snowflake;

  /**
   * The permissions for this command
   */
  permissions: ApplicationCommandPermissionData[];
}

interface GuildAuditLogsTypes {
  GUILD_UPDATE: ['GUILD', 'UPDATE'];
  CHANNEL_CREATE: ['CHANNEL', 'CREATE'];
  CHANNEL_UPDATE: ['CHANNEL', 'UPDATE'];
  CHANNEL_DELETE: ['CHANNEL', 'DELETE'];
  CHANNEL_OVERWRITE_CREATE: ['CHANNEL', 'CREATE'];
  CHANNEL_OVERWRITE_UPDATE: ['CHANNEL', 'UPDATE'];
  CHANNEL_OVERWRITE_DELETE: ['CHANNEL', 'DELETE'];
  MEMBER_KICK: ['USER', 'DELETE'];
  MEMBER_PRUNE: ['USER', 'DELETE'];
  MEMBER_BAN_ADD: ['USER', 'DELETE'];
  MEMBER_BAN_REMOVE: ['USER', 'CREATE'];
  MEMBER_UPDATE: ['USER', 'UPDATE'];
  MEMBER_ROLE_UPDATE: ['USER', 'UPDATE'];
  MEMBER_MOVE: ['USER', 'UPDATE'];
  MEMBER_DISCONNECT: ['USER', 'DELETE'];
  BOT_ADD: ['USER', 'CREATE'];
  ROLE_CREATE: ['ROLE', 'CREATE'];
  ROLE_UPDATE: ['ROLE', 'UPDATE'];
  ROLE_DELETE: ['ROLE', 'DELETE'];
  INVITE_CREATE: ['INVITE', 'CREATE'];
  INVITE_UPDATE: ['INVITE', 'UPDATE'];
  INVITE_DELETE: ['INVITE', 'DELETE'];
  WEBHOOK_CREATE: ['WEBHOOK', 'CREATE'];
  WEBHOOK_UPDATE: ['WEBHOOK', 'UPDATE'];
  WEBHOOK_DELETE: ['WEBHOOK', 'DELETE'];
  EMOJI_CREATE: ['EMOJI', 'CREATE'];
  EMOJI_UPDATE: ['EMOJI', 'UPDATE'];
  EMOJI_DELETE: ['EMOJI', 'DELETE'];
  MESSAGE_DELETE: ['MESSAGE', 'DELETE'];
  MESSAGE_BULK_DELETE: ['MESSAGE', 'DELETE'];
  MESSAGE_PIN: ['MESSAGE', 'CREATE'];
  MESSAGE_UNPIN: ['MESSAGE', 'DELETE'];
  INTEGRATION_CREATE: ['INTEGRATION', 'CREATE'];
  INTEGRATION_UPDATE: ['INTEGRATION', 'UPDATE'];
  INTEGRATION_DELETE: ['INTEGRATION', 'DELETE'];
  STAGE_INSTANCE_CREATE: ['STAGE_INSTANCE', 'CREATE'];
  STAGE_INSTANCE_UPDATE: ['STAGE_INSTANCE', 'UPDATE'];
  STAGE_INSTANCE_DELETE: ['STAGE_INSTANCE', 'DELETE'];
  STICKER_CREATE: ['STICKER', 'CREATE'];
  STICKER_UPDATE: ['STICKER', 'UPDATE'];
  STICKER_DELETE: ['STICKER', 'DELETE'];
  GUILD_SCHEDULED_EVENT_CREATE: ['GUILD_SCHEDULED_EVENT', 'CREATE'];
  GUILD_SCHEDULED_EVENT_UPDATE: ['GUILD_SCHEDULED_EVENT', 'UPDATE'];
  GUILD_SCHEDULED_EVENT_DELETE: ['GUILD_SCHEDULED_EVENT', 'DELETE'];
  THREAD_CREATE: ['THREAD', 'CREATE'];
  THREAD_UPDATE: ['THREAD', 'UPDATE'];
  THREAD_DELETE: ['THREAD', 'DELETE'];
}

export interface GuildAuditLogsIds {
  1: 'GUILD_UPDATE';
  10: 'CHANNEL_CREATE';
  11: 'CHANNEL_UPDATE';
  12: 'CHANNEL_DELETE';
  13: 'CHANNEL_OVERWRITE_CREATE';
  14: 'CHANNEL_OVERWRITE_UPDATE';
  15: 'CHANNEL_OVERWRITE_DELETE';
  20: 'MEMBER_KICK';
  21: 'MEMBER_PRUNE';
  22: 'MEMBER_BAN_ADD';
  23: 'MEMBER_BAN_REMOVE';
  24: 'MEMBER_UPDATE';
  25: 'MEMBER_ROLE_UPDATE';
  26: 'MEMBER_MOVE';
  27: 'MEMBER_DISCONNECT';
  28: 'BOT_ADD';
  30: 'ROLE_CREATE';
  31: 'ROLE_UPDATE';
  32: 'ROLE_DELETE';
  40: 'INVITE_CREATE';
  41: 'INVITE_UPDATE';
  42: 'INVITE_DELETE';
  50: 'WEBHOOK_CREATE';
  51: 'WEBHOOK_UPDATE';
  52: 'WEBHOOK_DELETE';
  60: 'EMOJI_CREATE';
  61: 'EMOJI_UPDATE';
  62: 'EMOJI_DELETE';
  72: 'MESSAGE_DELETE';
  73: 'MESSAGE_BULK_DELETE';
  74: 'MESSAGE_PIN';
  75: 'MESSAGE_UNPIN';
  80: 'INTEGRATION_CREATE';
  81: 'INTEGRATION_UPDATE';
  82: 'INTEGRATION_DELETE';
  83: 'STAGE_INSTANCE_CREATE';
  84: 'STAGE_INSTANCE_UPDATE';
  85: 'STAGE_INSTANCE_DELETE';
  90: 'STICKER_CREATE';
  91: 'STICKER_UPDATE';
  92: 'STICKER_DELETE';
  100: 'GUILD_SCHEDULED_EVENT_CREATE';
  101: 'GUILD_SCHEDULED_EVENT_UPDATE';
  102: 'GUILD_SCHEDULED_EVENT_DELETE';
  110: 'THREAD_CREATE';
  111: 'THREAD_UPDATE';
  112: 'THREAD_DELETE';
}

export type GuildAuditLogsActions = { [Key in keyof GuildAuditLogsIds as GuildAuditLogsIds[Key]]: Key } & { ALL: null };

export type GuildAuditLogsAction = keyof GuildAuditLogsActions;

export type GuildAuditLogsActionType = GuildAuditLogsTypes[keyof GuildAuditLogsTypes][1] | 'ALL';

export interface GuildAuditLogsEntryExtraField {
  MEMBER_PRUNE: { removed: number; days: number };
  MEMBER_MOVE: { channel: VoiceBasedChannel | { id: Snowflake }; count: number };
  MESSAGE_DELETE: { channel: GuildTextBasedChannel | { id: Snowflake }; count: number };
  MESSAGE_BULK_DELETE: { channel: GuildTextBasedChannel | { id: Snowflake }; count: number };
  MESSAGE_PIN: { channel: GuildTextBasedChannel | { id: Snowflake }; messageId: Snowflake };
  MESSAGE_UNPIN: { channel: GuildTextBasedChannel | { id: Snowflake }; messageId: Snowflake };
  MEMBER_DISCONNECT: { count: number };
  CHANNEL_OVERWRITE_CREATE:
    | Role
    | GuildMember
    | { id: Snowflake; name: string; type: OverwriteTypes.role }
    | { id: Snowflake; type: OverwriteTypes.member };
  CHANNEL_OVERWRITE_UPDATE:
    | Role
    | GuildMember
    | { id: Snowflake; name: string; type: OverwriteTypes.role }
    | { id: Snowflake; type: OverwriteTypes.member };
  CHANNEL_OVERWRITE_DELETE:
    | Role
    | GuildMember
    | { id: Snowflake; name: string; type: OverwriteTypes.role }
    | { id: Snowflake; type: OverwriteTypes.member };
  STAGE_INSTANCE_CREATE: StageChannel | { id: Snowflake };
  STAGE_INSTANCE_DELETE: StageChannel | { id: Snowflake };
  STAGE_INSTANCE_UPDATE: StageChannel | { id: Snowflake };
}

export interface GuildAuditLogsEntryTargetField<TActionType extends GuildAuditLogsActionType> {
  USER: User | null;
  GUILD: Guild;
  WEBHOOK: Webhook;
  INVITE: Invite;
  MESSAGE: TActionType extends 'MESSAGE_BULK_DELETE' ? Guild | { id: Snowflake } : User;
  INTEGRATION: Integration;
  CHANNEL: NonThreadGuildBasedChannel | { id: Snowflake; [x: string]: unknown };
  THREAD: ThreadChannel | { id: Snowflake; [x: string]: unknown };
  STAGE_INSTANCE: StageInstance;
  STICKER: Sticker;
  GUILD_SCHEDULED_EVENT: GuildScheduledEvent;
}

/**
 * Options used to fetch audit logs.
 */
export interface GuildAuditLogsFetchOptions<T extends GuildAuditLogsResolvable> {
  /**
   * Only return entries before this entry
   */
  before?: Snowflake | GuildAuditLogsEntry;

  /**
   * The number of entries to return
   */
  limit?: number;

  /**
   * Only return entries for actions made by this user
   */
  user?: UserResolvable;

  /**
   * Only return entries for this action type
   */
  type?: T;
}

export type GuildAuditLogsResolvable = keyof GuildAuditLogsIds | GuildAuditLogsAction | null;

export type GuildAuditLogsTarget = GuildAuditLogsTypes[keyof GuildAuditLogsTypes][0] | 'ALL' | 'UNKNOWN';

export type GuildAuditLogsTargets = {
  [key in GuildAuditLogsTarget]?: string;
};

/**
 * Data that resolves to give a GuildBan object.
 */
export type GuildBanResolvable = GuildBan | UserResolvable;

/**
 * Extra information about the overwrite
 */
export interface GuildChannelOverwriteOptions {
  /**
   * Reason for creating/editing this overwrite
   */
  reason?: string;

  /**
   * The type of overwrite, either `0` for a role or `1` for a member. Use this to bypass
   * automatic resolution of type that results in an error for uncached structure
   */
  type?: number;
}

/**
 * Data that can be resolved to give a Guild Channel object.
 */
export type GuildChannelResolvable = Snowflake | GuildBasedChannel;

/**
 * Options used to create a new channel in a guild.
 */
export interface GuildChannelCreateOptions extends Omit<CategoryCreateChannelOptions, 'type'> {
  /**
   * Parent of the new channel
   */
  parent?: CategoryChannelResolvable;

  /**
   * The type of the new channel.
   */
  type?: ExcludeEnum<
    typeof ChannelTypes,
    'DM' | 'GROUP_DM' | 'UNKNOWN' | 'GUILD_PUBLIC_THREAD' | 'GUILD_NEWS_THREAD' | 'GUILD_PRIVATE_THREAD'
  >;
}

/**
 * Options used to clone a guild channel.
 */
export interface GuildChannelCloneOptions extends GuildChannelCreateOptions {
  /**
   * Name of the new channel
   */
  name?: string;
}

/**
 * Extra information about the overwrite
 */
export interface GuildChannelOverwriteOptions {
  /**
   * Reason for creating/editing this overwrite
   */
  reason?: string;

  /**
   * The type of overwrite, either `0` for a role or `1` for a member. Use this to bypass
   * automatic resolution of type that results in an error for uncached structure
   */
  type?: number;
}

/**
 * Options used to create a guild.
 */
export interface GuildCreateOptions {
  /**
   * The AFK channel's id
   */
  afkChannelId?: Snowflake | number;

  /**
   * The AFK timeout in seconds
   */
  afkTimeout?: number;

  /**
   * The channels for this guild
   */
  channels?: PartialChannelData[];

  /**
   * The default message notifications for the guild
   */
  defaultMessageNotifications?: DefaultMessageNotificationLevel | number;

  /**
   * The explicit content filter level for the guild
   */
  explicitContentFilter?: ExplicitContentFilterLevel | number;

  /**
   * The icon for the guild
   */
  icon?: BufferResolvable | Base64Resolvable | null;

  /**
   * The roles for this guild, the first element of this array is used to change properties of the guild's everyone role.
   */
  roles?: PartialRoleData[];

  /**
   * The flags of the system channel
   */
  systemChannelFlags?: SystemChannelFlagsResolvable;

  /**
   * The system channel's id
   */
  systemChannelId?: Snowflake | number;

  /**
   * The verification level for the guild
   */
  verificationLevel?: VerificationLevel | number;
}

/**
 * Data for the Guild Widget Settings object
 */
export interface GuildWidgetSettings {
  /**
   * Whether the widget is enabled
   */
  enabled: boolean;

  /**
   * The widget invite channel
   */
  channel: NonThreadGuildBasedChannel | null;
}

/**
 * The data for editing a guild.
 */
export interface GuildEditData {
  /**
   * The name of the guild
   */
  name?: string;

  /**
   * The verification level of the guild
   */
  verificationLevel?: VerificationLevel | number;

  /**
   * The level of the explicit content filter
   */
  explicitContentFilter?: ExplicitContentFilterLevel | number;

  /**
   * The default message notification level of the guild
   */
  defaultMessageNotifications?: DefaultMessageNotificationLevel | number;

  /**
   * The AFK channel of the guild
   */
  afkChannel?: VoiceChannelResolvable;

  /**
   * The system channel of the guild
   */
  systemChannel?: TextChannelResolvable;

  /**
   * The system channel flags of the guild
   */
  systemChannelFlags?: SystemChannelFlagsResolvable;

  /**
   * The AFK timeout of the guild
   */
  afkTimeout?: number;

  /**
   * The icon of the guild
   */
  icon?: BufferResolvable | Base64Resolvable | null;

  /**
   * The owner of the guild
   */
  owner?: GuildMemberResolvable;

  /**
   * The invite splash image of the guild
   */
  splash?: BufferResolvable | Base64Resolvable | null;

  /**
   * The discovery splash image of the guild
   */
  discoverySplash?: BufferResolvable | Base64Resolvable | null;

  /**
   * The banner of the guild
   */
  banner?: BufferResolvable | Base64Resolvable | null;

  /**
   * The rules channel of the guild
   */
  rulesChannel?: TextChannelResolvable;

  /**
   * The community updates channel of the guild
   */
  publicUpdatesChannel?: TextChannelResolvable;

  /**
   * The preferred locale of the guild
   */
  preferredLocale?: string;

  /**
   * Whether the guild's premium progress bar is enabled
   */
  premiumProgressBarEnabled?: boolean;

  /**
   * The discovery description of the guild
   */
  description?: string | null;

  /**
   * The features of the guild
   */
  features?: GuildFeatures[];
}

/**
 * Options used for creating an emoji in a guild.
 */
export interface GuildEmojiCreateOptions {
  /**
   * The roles to limit the emoji to
   */
  roles?: Collection<Snowflake, Role> | RoleResolvable[];

  /**
   * The reason for creating the emoji
   */
  reason?: string;
}

/**
 * Data for editing an emoji.
 */
export interface GuildEmojiEditData {
  /**
   * The name of the emoji
   */
  name?: string;

  /**
   * Roles to restrict emoji to
   */
  roles?: Collection<Snowflake, Role> | RoleResolvable[];
}

/**
 * Options for creating a guild sticker.
 */
export interface GuildStickerCreateOptions {
  /**
   * The description for the sticker
   */
  description?: string | null;

  /**
   * Reason for creating the sticker
   */
  reason?: string;
}

/**
 * Data for editing a sticker.
 */
export interface GuildStickerEditData {
  /**
   * The name of the sticker
   */
  name?: string;

  /**
   * The description of the sticker
   */
  description?: string | null;

  /**
   * The Discord name of a unicode emoji representing the sticker's expression
   */
  tags?: string;
}

export type GuildFeatures =
  | 'ANIMATED_ICON'
  | 'BANNER'
  | 'COMMERCE'
  | 'COMMUNITY'
  | 'DISCOVERABLE'
  | 'FEATURABLE'
  | 'INVITE_SPLASH'
  | 'MEMBER_VERIFICATION_GATE_ENABLED'
  | 'NEWS'
  | 'PARTNERED'
  | 'PREVIEW_ENABLED'
  | 'VANITY_URL'
  | 'VERIFIED'
  | 'VIP_REGIONS'
  | 'WELCOME_SCREEN_ENABLED'
  | 'TICKETED_EVENTS_ENABLED'
  | 'MONETIZATION_ENABLED'
  | 'MORE_STICKERS'
  | 'THREE_DAY_THREAD_ARCHIVE'
  | 'SEVEN_DAY_THREAD_ARCHIVE'
  | 'PRIVATE_THREADS'
  | 'ROLE_ICONS';

/**
 * The data for editing a guild member.
 */
export interface GuildMemberEditData {
  /**
   * The nickname to set for the member
   */
  nick?: string | null;

  /**
   * The roles or role ids to apply
   */
  roles?: Collection<Snowflake, Role> | readonly RoleResolvable[];

  /**
   * Whether or not the member should be muted
   */
  mute?: boolean;

  /**
   * Whether or not the member should be deafened
   */
  deaf?: boolean;

  /**
   * Channel to move the member to (if they are connected to voice), or `null` if you want to disconnect them from voice
   */
  channel?: GuildVoiceChannelResolvable | null;

  /**
   * The date or timestamp for the member's communication to be disabled until.
   * Provide `null` to enable communication again.
   */
  communicationDisabledUntil?: DateResolvable | null;
}

/**
 * Data that resolves to give a GuildMember object.
 */
export type GuildMemberResolvable = GuildMember | UserResolvable;

/**
 * Data that resolves to give a Guild object.
 */
export type GuildResolvable = Guild | NonThreadGuildBasedChannel | GuildMember | GuildEmoji | Invite | Role | Snowflake;

/**
 * Options used for pruning guild members.
 * <info>It's recommended to set {@link GuildPruneMembersOptions.count options.count}
 * to `false` for large guilds.</info>
 */
export interface GuildPruneMembersOptions {
  /**
   * Whether or not to return the number of users that have been kicked.
   */
  count?: boolean;

  /**
   * Number of days of inactivity required to kick
   */
  days?: number;

  /**
   * Get the number of users that will be kicked, without actually kicking them
   */
  dry?: boolean;

  /**
   * Reason for this prune
   */
  reason?: string;

  /**
   * Array of roles to bypass the "...and no roles" constraint when pruning
   */
  roles?: RoleResolvable[];
}

/**
 * The Guild Widget Settings object
 */
export interface GuildWidgetSettingsData {
  /**
   * Whether the widget is enabled
   */
  enabled: boolean;

  /**
   * The widget invite channel
   */
  channel: GuildChannelResolvable | null;
}

/**
 * Options used for searching guild members.
 */
export interface GuildSearchMembersOptions {
  /**
   * Filter members whose username or nickname start with this query
   */
  query: string;

  /**
   * Maximum number of members to search
   */
  limit?: number;

  /**
   * Whether or not to cache the fetched member(s)
   */
  cache?: boolean;
}

/**
 * Options used for listing guild members.
 */
export interface GuildListMembersOptions {
  /**
   * Limit fetching members to those with an id greater than the supplied id
   */
  after?: Snowflake;

  /**
   * Maximum number of members to list
   */
  limit?: number;

  /**
   * Whether or not to cache the fetched member(s)
   */
  cache?: boolean;
}

/**
 * Options used to create a guild scheduled event.
 */
// TODO: use conditional types for better TS support
export interface GuildScheduledEventCreateOptions {
  /**
   * The name of the guild scheduled event
   */
  name: string;

  /**
   * The time to schedule the event at
   */
  scheduledStartTime: DateResolvable;

  /**
   * The time to end the event at
   * <warn>This is required if `entityType` is 'EXTERNAL'</warn>
   */
  scheduledEndTime?: DateResolvable;

  /**
   * The privacy level of the guild scheduled event
   */
  privacyLevel: GuildScheduledEventPrivacyLevel | number;

  /**
   * The scheduled entity type of the event
   */
  entityType: GuildScheduledEventEntityType | number;

  /**
   * The description of the guild scheduled event
   */
  description?: string;

  /**
   * The channel of the guild scheduled event
   * <warn>This is required if `entityType` is 'STAGE_INSTANCE' or `VOICE`</warn>
   */
  channel?: GuildVoiceChannelResolvable;

  /**
   * The entity metadata of the guild scheduled event
   */
  entityMetadata?: GuildScheduledEventEntityMetadataOptions;

  /**
   * The reason for creating the guild scheduled event
   */
  reason?: string;
}

/**
 * Options used to edit a guild scheduled event.
 */
export interface GuildScheduledEventEditOptions<
  S extends GuildScheduledEventStatus,
  T extends GuildScheduledEventSetStatusArg<S>,
> extends Omit<Partial<GuildScheduledEventCreateOptions>, 'channel'> {
  /**
   * The channel of the guild scheduled event
   */
  channel?: GuildVoiceChannelResolvable | null;

  /**
   * The status of the guild scheduled event
   */
  status?: T | number;
}

/**
 * Represents the additional metadata for a {@link GuildScheduledEvent}
 * @see {@link [Guild Scheduled Event Entity Metadata](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-metadata)}
 */
export interface GuildScheduledEventEntityMetadata {
  /**
   * The location of the guild scheduled event
   */
  location: string | null;
}

/**
 * Options used to set entity metadata of a guild scheduled event.
 */
export interface GuildScheduledEventEntityMetadataOptions {
  /**
   * The location of the guild scheduled event
   * <warn>This is required if `entityType` is 'EXTERNAL'</warn>
   */
  location?: string;
}

/**
 * The entity type of a {@link GuildScheduledEvent}
 * @see {@link [Guild Scheduled Event Entity Types](https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-entity-types)}
 */
export type GuildScheduledEventEntityType = keyof typeof GuildScheduledEventEntityTypes;

export type GuildScheduledEventManagerFetchResult<
  T extends GuildScheduledEventResolvable | FetchGuildScheduledEventOptions | FetchGuildScheduledEventsOptions,
> = T extends GuildScheduledEventResolvable | FetchGuildScheduledEventOptions
  ? GuildScheduledEvent
  : Collection<Snowflake, GuildScheduledEvent>;

export type GuildScheduledEventManagerFetchSubscribersResult<T extends FetchGuildScheduledEventSubscribersOptions> =
  T extends { withMember: true }
    ? Collection<Snowflake, GuildScheduledEventUser<true>>
    : Collection<Snowflake, GuildScheduledEventUser<false>>;

/**
 * Privacy level of a {@link GuildScheduledEvent} object:
 * * GUILD_ONLY
 * @typedef {string} GuildScheduledEventPrivacyLevel
 * @see {@link https://discord.com/developers/docs/resources/guild-scheduled-event#guild-scheduled-event-object-guild-scheduled-event-privacy-level}
 */
export type GuildScheduledEventPrivacyLevel = keyof typeof GuildScheduledEventPrivacyLevels;

export type GuildScheduledEventResolvable = Snowflake | GuildScheduledEvent;

export type GuildScheduledEventSetStatusArg<T extends GuildScheduledEventStatus> = T extends 'SCHEDULED'
  ? 'ACTIVE' | 'CANCELED'
  : T extends 'ACTIVE'
  ? 'COMPLETED'
  : never;

export type GuildScheduledEventStatus = keyof typeof GuildScheduledEventStatuses;

/**
 * Represents a subscriber of a {@link GuildScheduledEvent}
 */
export interface GuildScheduledEventUser<T> {
  /**
   * The id of the guild scheduled event which the user subscribed to
   */
  guildScheduledEventId: Snowflake;

  /**
   * The user that subscribed to the guild scheduled event
   */
  user: User;

  /**
   * The guild member associated with the user, if any
   */
  member: T extends true ? GuildMember : null;
}

/**
 * Data that can be resolved to give a template code.
 */
export type GuildTemplateResolvable = string;

/**
 * Data that can be resolved to a GuildVoiceChannel object.
 */
export type GuildVoiceChannelResolvable = VoiceBasedChannel | Snowflake;

export type HexColorString = `#${string}`;

/**
 * The attachment data that is sent to Discord
 */
export interface HTTPAttachmentData {
  /**
   * The source of this attachment data
   */
  attachment: string | Buffer | Stream;

  /**
   * The file name
   */
  name: string;

  /**
   * The file buffer
   */
  file: Buffer | Stream;
}

/**
 * The HTTP data that was sent to Discord
 */
export interface HTTPErrorData {
  /**
   * The JSON data that was sent
   */
  json: unknown;

  /**
   * The files that were sent with this request, if any
   */
  files: HTTPAttachmentData[];
}

/**
 * HTTP options
 */
export interface HTTPOptions {
  /**
   * HTTPS Agent options
   */
  agent?: Omit<AgentOptions, 'keepAlive'>;

  /**
   * Base URL of the API
   */
  api?: string;

  /**
   * API version to use
   */
  version?: number;

  host?: string;

  /**
   * Base URL of the CDN
   */
  cdn?: string;

  /**
   * Base URL of invites
   */
  invite?: string;

  /**
   * Base URL of templates
   */
  template?: string;

  /**
   * Additional headers to send for all API requests
   */
  headers?: Record<string, string>;
  scheduledEvent?: string;
}

/**
 * Options for Image URLs.
 */
export interface ImageURLOptions extends Omit<StaticImageURLOptions, 'format'> {
  /**
   * If true, the format will dynamically change to `gif` for animated avatars.
   */
  dynamic?: boolean;

  /**
   * The format of the image
   */
  format?: DynamicImageFormat;
}

/**
 * The information account for an integration
 */
export interface IntegrationAccount {
  /**
   * The id of the account
   */
  id: string | Snowflake;

  /**
   * The name of the account
   */
  name: string;
}

/**
 * The type of an {@link Integration}.
 */
export type IntegrationType = 'twitch' | 'youtube' | 'discord';

export interface InteractionCollectorOptions<T extends Interaction, Cached extends CacheType = CacheType>
  extends CollectorOptions<[T]> {
  /**
   * The channel to listen to interactions from
   */
  channel?: TextBasedChannel;

  /**
   * The type of component to listen for
   */
  componentType?: MessageComponentType | MessageComponentTypes;

  /**
   * The guild to listen to interactions from
   */
  guild?: Guild;

  /**
   * The type of interaction to listen for
   */
  interactionType?: InteractionType | InteractionTypes;

  /**
   * The maximum total amount of interactions to collect
   */
  max?: number;

  /**
   * The maximum number of components to collect
   */
  maxComponents?: number;

  /**
   * The maximum number of users to interact
   */
  maxUsers?: number;

  /**
   * The message to listen to interactions from
   */
  message?: CacheTypeReducer<Cached, Message, APIMessage>;
}

export interface ButtonInteractionCollectorOptions<Cached = boolean>
  extends MessageComponentCollectorOptions<Cached extends true ? ButtonInteraction<'cached'> : ButtonInteraction> {
  componentType: 'BUTTON' | MessageComponentTypes.BUTTON;
}

export interface SelectMenuInteractionCollectorOptions<Cached = boolean>
  extends MessageComponentCollectorOptions<
    Cached extends true ? SelectMenuInteraction<'cached'> : SelectMenuInteraction
  > {
  componentType: 'SELECT_MENU' | MessageComponentTypes.SELECT_MENU;
}

export interface MessageInteractionCollectorOptions<Cached = boolean>
  extends MessageComponentCollectorOptions<
    Cached extends true ? MessageComponentInteraction<'cached'> : MessageComponentInteraction
  > {
  componentType: 'ACTION_ROW' | MessageComponentTypes.ACTION_ROW;
}

export type InteractionCollectorOptionsResolvable<Cached = boolean> =
  | MessageInteractionCollectorOptions<Cached>
  | SelectMenuInteractionCollectorOptions<Cached>
  | ButtonInteractionCollectorOptions<Cached>;

/**
 * Options for deferring the reply to an {@link Interaction}.
 */
export interface InteractionDeferReplyOptions {
  /**
   * Whether the reply should be ephemeral
   */
  ephemeral?: boolean;

  /**
   * Whether to fetch the reply
   */
  fetchReply?: boolean;
}

/**
 * Options for deferring and updating the reply to a {@link MessageComponentInteraction}.
 */
export type InteractionDeferUpdateOptions = Omit<InteractionDeferReplyOptions, 'ephemeral'>;

/**
 * Options for a reply to an {@link Interaction}.
 */
export interface InteractionReplyOptions extends Omit<WebhookMessageOptions, 'username' | 'avatarURL'> {
  /**
   * Whether the reply should be ephemeral
   */
  ephemeral?: boolean;

  /**
   * Whether to fetch the reply
   */
  fetchReply?: boolean;
}

/**
 * The type of an interaction response
 * @see {@link [Interaction Callback Type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-response-object-interaction-callback-type)}
 */
export type InteractionResponseType = keyof typeof InteractionResponseTypes;

/**
 * The type of an {@link Interaction} object
 * @see {@link [Interaction Type](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-interaction-type)}
 */
export type InteractionType = keyof typeof InteractionTypes;

/**
 * Options for updating the message received from a {@link MessageComponentInteraction}.
 */
export interface InteractionUpdateOptions extends MessageEditOptions {
  /**
   * Whether to fetch the reply
   */
  fetchReply?: boolean;
}

export type IntentsString =
  | 'GUILDS'
  | 'GUILD_MEMBERS'
  | 'GUILD_BANS'
  | 'GUILD_EMOJIS_AND_STICKERS'
  | 'GUILD_INTEGRATIONS'
  | 'GUILD_WEBHOOKS'
  | 'GUILD_INVITES'
  | 'GUILD_VOICE_STATES'
  | 'GUILD_PRESENCES'
  | 'GUILD_MESSAGES'
  | 'GUILD_MESSAGE_REACTIONS'
  | 'GUILD_MESSAGE_TYPING'
  | 'DIRECT_MESSAGES'
  | 'DIRECT_MESSAGE_REACTIONS'
  | 'DIRECT_MESSAGE_TYPING'
  | 'GUILD_SCHEDULED_EVENTS';

/**
 * Options for {@link Client.generateInvite}.
 */
export interface InviteGenerationOptions {
  /**
   * Permissions to request
   */
  permissions?: PermissionResolvable;

  /**
   * Guild to preselect
   */
  guild?: GuildResolvable;

  /**
   * Whether to disable the guild selection
   */
  disableGuildSelect?: boolean;

  /**
   * Scopes that should be requested
   */
  scopes: InviteScope[];
}

/**
 * Data that can be resolved to a channel that an invite can be created on.
 */
export type GuildInvitableChannelResolvable =
  | TextChannel
  | VoiceChannel
  | NewsChannel
  | StoreChannel
  | StageChannel
  | Snowflake;

/**
 * Options used to create an invite to a guild channel.
 */
export interface CreateInviteOptions {
  /**
   * Whether members that joined via the invite should be automatically
   * kicked after 24 hours if they have not yet received a role
   */
  temporary?: boolean;

  /**
   * How long the invite should last (in seconds, 0 for forever)
   */
  maxAge?: number;

  /**
   * Maximum number of uses
   */
  maxUses?: number;

  /**
   * Create a unique invite, or use an existing one with similar settings
   */
  unique?: boolean;

  /**
   * The reason for creating the invite
   */
  reason?: string;

  /**
   * The embedded application to open for this invite,
   * required if `targetType` is 2, the application must have the `EMBEDDED` flag
   */
  targetApplication?: ApplicationResolvable;

  /**
   * The type of the target for this voice channel invite
   */
  targetUser?: UserResolvable;

  /**
   * The type of the target for this voice channel invite
   */
  targetType?: InviteTargetType;
}

/**
 * The behavior of expiring subscribers for Integrations.
 * @see {@link [Integration Expire Behaviors](https://discord.com/developers/docs/resources/guild#integration-object-integration-expire-behaviors)}
 */
export type IntegrationExpireBehaviors = 'REMOVE_ROLE' | 'KICK';

/**
 * Data that resolves to give an Invite object.
 */
export type InviteResolvable = string;

/**
 * A valid scope to request when generating an invite link.
 * <warn>Scopes that require whitelist are not considered valid for this generator</warn>
 * * `applications.builds.read`: allows reading build data for a users applications
 * * `applications.commands`: allows this bot to create commands in the server
 * * `applications.entitlements`: allows reading entitlements for a users applications
 * * `applications.store.update`: allows reading and updating of store data for a users applications
 * * `bot`: makes the bot join the selected guild
 * * `connections`: makes the endpoint for getting a users connections available
 * * `email`: allows the `/users/@me` endpoint return with an email
 * * `identify`: allows the `/users/@me` endpoint without an email
 * * `guilds`: makes the `/users/@me/guilds` endpoint available for a user
 * * `guilds.join`: allows the bot to join the user to any guild it is in using Guild#addMember
 * * `gdm.join`: allows joining the user to a group dm
 * * `webhook.incoming`: generates a webhook to a channel
 * @see {@link [OAuth2 Scopes](https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes)}
 */
export type InviteScope =
  | 'applications.builds.read'
  | 'applications.commands'
  | 'applications.entitlements'
  | 'applications.store.update'
  | 'bot'
  | 'connections'
  | 'email'
  | 'identify'
  | 'guilds'
  | 'guilds.join'
  | 'gdm.join'
  | 'webhook.incoming';

/**
 * Options for generating a filter function based on lifetime
 */
export interface LifetimeFilterOptions<K, V> {
  /**
   * A function that takes an entry, key, and the collection and returns a boolean, `true` when the entry should
   * not be checked for sweepability.
   */
  excludeFromSweep?: (value: V, key: K, collection: LimitedCollection<K, V>) => boolean;

  /**
   * A function that takes an entry, key, and the collection and returns a timestamp to compare against in order
   * to determine the lifetime of the entry.
   */
  getComparisonTimestamp?: (value: V, key: K, collection: LimitedCollection<K, V>) => number;

  /**
   * How long, in seconds, an entry should stay in the collection before it is considered sweepable.
   */
  lifetime?: number;
}

/**
 * Options used to make an error object.
 */
export interface MakeErrorOptions {
  /**
   * Error type
   */
  name: string;

  /**
   * Message for the error
   */
  message: string;

  /**
   * Stack for the error
   */
  stack: string;
}

export type MemberMention = UserMention | `<@!${Snowflake}>`;

/**
 * The value set for a team member's membership state
 * @see {@link [Membership State Enum](https://discord.com/developers/docs/topics/teams#data-models-membership-state-enum)}
 */
export type MembershipState = keyof typeof MembershipStates;

/**
 * Components that can be placed in an action row
 */
export type MessageActionRowComponent = MessageButton | MessageSelectMenu;

/**
 * Options for components that can be placed in an action row
 */
export type MessageActionRowComponentOptions =
  | (Required<BaseMessageComponentOptions> & MessageButtonOptions)
  | (Required<BaseMessageComponentOptions> & MessageSelectMenuOptions);

/**
 * Data that can be resolved into components that can be placed in an action row
 */
export type MessageActionRowComponentResolvable = MessageActionRowComponent | MessageActionRowComponentOptions;

export interface MessageActionRowOptions extends BaseMessageComponentOptions {
  /**
   * The components to place in this action row
   */
  components: MessageActionRowComponentResolvable[];
}

/**
 * Activity sent in a message.
 */
export interface MessageActivity {
  /**
   * Id of the party represented in activity
   */
  partyId: string;

  /**
   * Type of activity sent
   */
  type: number;
}

export interface BaseButtonOptions extends BaseMessageComponentOptions {
  /**
   * Disables the button to prevent interactions
   */
  disabled?: boolean;

  /**
   * The emoji to be displayed to the left of the text
   */
  emoji?: EmojiIdentifierResolvable;

  /**
   * The text to be displayed on this button
   */
  label?: string;
}

export interface LinkButtonOptions extends BaseButtonOptions {
  /**
   * The style of this button
   */
  style: 'LINK' | MessageButtonStyles.LINK;

  /**
   * Optional URL for link-style buttons
   */
  url: string;
}

export interface InteractionButtonOptions extends BaseButtonOptions {
  /**
   * The style of this button
   */
  style: ExcludeEnum<typeof MessageButtonStyles, 'LINK'>;

  /**
   * A unique string to be sent in the interaction when clicked
   */
  customId: string;
}

export type MessageButtonOptions = InteractionButtonOptions | LinkButtonOptions;

/**
 * The style of a message button
 * @see {@link [Button Styles](https://discord.com/developers/docs/interactions/message-components#button-object-button-styles)}
 */
export type MessageButtonStyle = keyof typeof MessageButtonStyles;

/**
 * Data that can be resolved to a MessageButtonStyle.
 */
export type MessageButtonStyleResolvable = MessageButtonStyle | MessageButtonStyles;

export interface MessageCollectorOptions extends CollectorOptions<[Message]> {
  /**
   * The maximum amount of messages to collect
   */
  max?: number;

  /**
   * The maximum amount of messages to process
   */
  maxProcessed?: number;
}

/**
 * Components that can be sent in a message.
 * @see {@link [Component Types](https://discord.com/developers/docs/interactions/message-components#component-object-component-types)}
 */
export type MessageComponent = BaseMessageComponent | MessageActionRow | MessageButton | MessageSelectMenu;

export type MessageComponentCollectorOptions<T extends MessageComponentInteraction> = Omit<
  InteractionCollectorOptions<T>,
  'channel' | 'message' | 'guild' | 'interactionType'
>;

export type MessageChannelComponentCollectorOptions<T extends MessageComponentInteraction> = Omit<
  InteractionCollectorOptions<T>,
  'channel' | 'guild' | 'interactionType'
>;

/**
 * Data that can be resolved into options for a MessageComponent.
 */
export type MessageComponentOptions =
  | BaseMessageComponentOptions
  | MessageActionRowOptions
  | MessageButtonOptions
  | MessageSelectMenuOptions;

export type MessageComponentType = keyof typeof MessageComponentTypes;

/**
 * Data that can be resolved to a MessageComponentType.
 */
export type MessageComponentTypeResolvable = MessageComponentType | MessageComponentTypes;

/**
 * Options that can be passed into {@link Message.edit}.
 */
export interface MessageEditOptions {
  /**
   * An array of attachments to keep, all attachments will be kept if omitted
   */
  attachments?: MessageAttachment[];

  /**
   * Content to be edited
   */
  content?: string | null;

  /**
   * Embeds to be added/edited
   */
  embeds?: (MessageEmbed | MessageEmbedOptions | APIEmbed)[] | null;

  /**
   * Files to add to the message
   */
  files?: (FileOptions | BufferResolvable | Stream | MessageAttachment)[];

  /**
   * Which flags to set for the message. Only `SUPPRESS_EMBEDS` can be edited.
   */
  flags?: BitFieldResolvable<MessageFlagsString, number>;

  /**
   * Which mentions should be parsed from the message content
   */
  allowedMentions?: MessageMentionOptions;

  /**
   * Action rows containing interactive components for the message (buttons, select menus)
   */
  components?: (MessageActionRow | (Required<BaseMessageComponentOptions> & MessageActionRowOptions))[];
}

/**
 * Represents the author field of a MessageEmbed
 */
export interface MessageEmbedAuthor {
  /**
   * The name of this author
   */
  name: string;

  /**
   * URL of this author
   */
  url?: string;

  /**
   * URL of the icon for this author
   */
  iconURL?: string;

  /**
   * Proxied URL of the icon for this author
   */
  proxyIconURL?: string;
}

/**
 * Represents the footer field of a MessageEmbed
 */
export interface MessageEmbedFooter {
  /**
   * The text of this footer
   */
  text: string;

  /**
   * URL of the icon for this footer
   */
  iconURL?: string;

  /**
   * Proxied URL of the icon for this footer
   */
  proxyIconURL?: string;
}

/**
 * Represents the image of a MessageEmbed
 */
export interface MessageEmbedImage {
  /**
   * URL for this image
   */
  url: string;

  /**
   * ProxyURL for this image
   */
  proxyURL?: string;

  /**
   * Height of this image
   */
  height?: number;

  /**
   * Width of this image
   */
  width?: number;
}

/**
 * Represents the possible options for a MessageEmbed
 */
export interface MessageEmbedOptions {
  /**
   * The title of this embed
   */
  title?: string;

  /**
   * The description of this embed
   */
  description?: string;

  /**
   * The URL of this embed
   */
  url?: string;

  /**
   * The timestamp of this embed
   */
  timestamp?: Date | number;

  /**
   * The color of this embed
   */
  color?: ColorResolvable;

  /**
   * The fields of this embed
   */
  fields?: EmbedFieldData[];

  /**
   * The author of this embed
   */
  author?: Partial<MessageEmbedAuthor> & { icon_url?: string; proxy_icon_url?: string };

  /**
   * The thumbnail of this embed
   */
  thumbnail?: Partial<MessageEmbedThumbnail> & { proxy_url?: string };

  /**
   * The image of this embed
   */
  image?: Partial<MessageEmbedImage> & { proxy_url?: string };

  /**
   * The video of this embed
   */
  video?: Partial<MessageEmbedVideo> & { proxy_url?: string };

  /**
   * The footer of this embed
   */
  footer?: Partial<MessageEmbedFooter> & { icon_url?: string; proxy_icon_url?: string };
}

/**
 * Represents the provider of a MessageEmbed
 */
export interface MessageEmbedProvider {
  /**
   * The name of this provider
   */
  name: string;

  /**
   * URL of this provider
   */
  url: string;
}

/**
 * Represents the thumbnail of a MessageEmbed
 */
export interface MessageEmbedThumbnail {
  /**
   * URL for this thumbnail
   */
  url: string;

  /**
   * ProxyURL for this thumbnail
   */
  proxyURL?: string;

  /**
   * Height of this thumbnail
   */
  height?: number;

  /**
   * Width of this thumbnail
   */
  width?: number;
}

/**
 * Represents the video of a MessageEmbed
 */
export interface MessageEmbedVideo {
  /**
   * URL of this video
   */
  url?: string;

  /**
   * ProxyURL for this video
   */
  proxyURL?: string;

  /**
   * Height of this video
   */
  height?: number;

  /**
   * Width of this video
   */
  width?: number;
}

/**
 * @external
 * @see {@link [MessageEvent](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent)}
 */
export interface MessageEvent {
  data: WebSocket.Data;
  type: string;
  target: WebSocket;
}

export type MessageFlagsString =
  | 'CROSSPOSTED'
  | 'IS_CROSSPOST'
  | 'SUPPRESS_EMBEDS'
  | 'SOURCE_MESSAGE_DELETED'
  | 'URGENT'
  | 'HAS_THREAD'
  | 'EPHEMERAL'
  | 'LOADING';

/**
 * Partial data of the interaction that a message is a reply to
 */
export interface MessageInteraction {
  /**
   * The interaction's id
   */
  id: Snowflake;

  /**
   * The type of the interaction
   */
  type: InteractionType;

  /**
   * The name of the interaction's application command
   */
  commandName: string;

  /**
   * The user that invoked the interaction
   */
  user: User;
}

/**
 * Options used to check for a mention.
 */
export interface MessageMentionsHasOptions {
  /**
   * Whether to ignore direct mentions to the item
   */
  ignoreDirect?: boolean;

  /**
   * Whether to ignore role mentions to a guild member
   */
  ignoreRoles?: boolean;

  /**
   * Whether to ignore everyone/here mentions
   */
  ignoreEveryone?: boolean;
}

/**
 * Options provided to control parsing of mentions by Discord
 */
export interface MessageMentionOptions {
  /**
   * Types of mentions to be parsed
   */
  parse?: MessageMentionTypes[];

  /**
   * Snowflakes of Roles to be parsed as mentions
   */
  roles?: Snowflake[];

  /**
   * Snowflakes of Users to be parsed as mentions
   */
  users?: Snowflake[];

  /**
   * Whether the author of the Message being replied to should be pinged
   */
  repliedUser?: boolean;
}

/**
 * Types of mentions to enable in MessageMentionOptions.
 */
export type MessageMentionTypes = 'roles' | 'users' | 'everyone';

/**
 * Options provided when sending a message.
 */
export interface MessageOptions {
  /**
   * Whether or not the message should be spoken aloud
   */
  tts?: boolean;

  /**
   * The nonce for the message
   */
  nonce?: string | number;

  /**
   * The content for the message
   */
  content?: string | null;

  /**
   * The embeds for the message
   * (see [here](https://discord.com/developers/docs/resources/channel#embed-object) for more details)
   */
  embeds?: (MessageEmbed | MessageEmbedOptions | APIEmbed)[];

  /**
   * Action rows containing interactive components for the message (buttons, select menus)
   */
  components?: (MessageActionRow | (Required<BaseMessageComponentOptions> & MessageActionRowOptions))[];

  /**
   * Which mentions should be parsed from the message content
   * (see [here](https://discord.com/developers/docs/resources/channel#allowed-mentions-object) for more details)
   */
  allowedMentions?: MessageMentionOptions;

  /**
   * Files to send with the message
   */
  files?: (FileOptions | BufferResolvable | Stream | MessageAttachment)[];

  /**
   * The options for replying to a message
   */
  reply?: ReplyOptions;

  /**
   * Stickers to send in the message
   */
  stickers?: StickerResolvable[];

  /**
   * Attachments to send in the message
   */
  attachments?: MessageAttachment[];
}

/**
 * Data that can be resolved to a MessageReaction object.
 */
export type MessageReactionResolvable =
  | MessageReaction
  | Snowflake
  | `${string}:${Snowflake}`
  | `<:${string}:${Snowflake}>`
  | `<a:${string}:${Snowflake}>`
  | string;

/**
 * Reference data sent in a message that contains ids identifying the referenced message.
 * This can be present in the following types of message:
 * * Crossposted messages (IS_CROSSPOST {@link MessageFlags.FLAGS message flag})
 * * CHANNEL_FOLLOW_ADD
 * * CHANNEL_PINNED_MESSAGE
 * * REPLY
 * * THREAD_STARTER_MESSAGE
 * @see {@link [Message Types](https://discord.com/developers/docs/resources/channel#message-types)}
 */
export interface MessageReference {
  /**
   * The channel's id the message was referenced
   */
  channelId: Snowflake;

  /**
   * The guild's id the message was referenced
   */
  guildId: Snowflake | undefined;

  /**
   * The message's id that was referenced
   */
  messageId: Snowflake | undefined;
}

/**
 * Data that can be resolved to a Message object.
 */
export type MessageResolvable = Message | Snowflake;

export interface MessageSelectMenuOptions extends BaseMessageComponentOptions {
  /**
   * A unique string to be sent in the interaction when clicked
   */
  customId?: string;

  /**
   * Disables the select menu to prevent interactions
   */
  disabled?: boolean;

  /**
   * The maximum number of selections allowed
   */
  maxValues?: number;

  /**
   * The minimum number of selections required
   */
  minValues?: number;

  /**
   * Options for the select menu
   */
  options?: MessageSelectOptionData[];

  /**
   * Custom placeholder text to display when nothing is selected
   */
  placeholder?: string;
}

export interface MessageSelectOption {
  /**
   * Render this option as the default selection
   */
  default: boolean;

  /**
   * Optional description to show for this option
   */
  description: string | null;

  /**
   * Emoji to display for this option
   */
  emoji: APIPartialEmoji | null;

  /**
   * The text to be displayed on this option
   */
  label: string;

  /**
   * The value to be sent for this option
   */
  value: string;
}

export interface MessageSelectOptionData {
  /**
   * Render this option as the default selection
   */
  default?: boolean;

  /**
   * Optional description to show for this option
   */
  description?: string;

  /**
   * Emoji to display for this option
   */
  emoji?: EmojiIdentifierResolvable;

  /**
   * The text to be displayed on this option
   */
  label: string;

  /**
   * The value to be sent for this option
   */
  value: string;
}

/**
 * A target for a message.
 */
export type MessageTarget =
  | Interaction
  | InteractionWebhook
  | TextBasedChannel
  | User
  | GuildMember
  | Webhook
  | WebhookClient
  | Message
  | MessageManager;

/**
 * The type of a message, e.g. `DEFAULT`.
 * @see {@link [Message Types](https://discord.com/developers/docs/resources/channel#message-object-message-types)}
 */
export type MessageType = keyof typeof MessageTypes;

/**
 * The required MFA level for a guild
 * @see {@link [MFA Level](https://discord.com/developers/docs/resources/guild#guild-object-mfa-level)}
 */
export type MFALevel = keyof typeof MFALevels;

/**
 * Options used to respawn all shards.
 */
export interface MultipleShardRespawnOptions {
  /**
   * How long to wait between shards (in milliseconds)
   */
  shardDelay?: number;

  /**
   * How long to wait between killing a shard's process and restarting it (in milliseconds)
   */
  respawnDelay?: number;

  /**
   * The amount in milliseconds to wait for a shard to become ready before continuing to another (`-1` or `Infinity` for no wait)
   */
  timeout?: number;
}

/**
 * Options used to spawn multiple shards.
 */
export interface MultipleShardSpawnOptions {
  /**
   * Number of shards to spawn
   */
  amount?: number | 'auto';

  /**
   * How long to wait in between spawning each shard (in milliseconds)
   */
  delay?: number;

  /**
   * The amount in milliseconds to wait until the {@link Client} has become ready
   */
  timeout?: number;
}

/**
 * NSFW level of a Guild
 * @see {@link [Guild NSFW Level](https://discord.com/developers/docs/resources/guild#guild-object-guild-nsfw-level)}
 */
export type NSFWLevel = keyof typeof NSFWLevels;

/**
 * Data that can be used for a permission overwrite
 */
export interface OverwriteData {
  /**
   * The permissions to allow
   */
  allow?: PermissionResolvable;

  /**
   * The permissions to deny
   */
  deny?: PermissionResolvable;

  /**
   * Member or role this overwrite is for
   */
  id: GuildMemberResolvable | RoleResolvable;

  /**
   * The type of this OverwriteData
   */
  type?: OverwriteType;
}

/**
 * Data that can be resolved into {@link RawOverwriteData}.
 */
export type OverwriteResolvable = PermissionOverwrites | OverwriteData;

/**
 * An overwrite type
 * @see {@link [Overwrite Structure](https://discord.com/developers/docs/resources/channel#overwrite-object-overwrite-structure)}
 */
export type OverwriteType = 'member' | 'role';

export type PermissionFlags = Record<PermissionString, bigint>;

/**
 * An object mapping permission flags to `true` (enabled), `null` (unset) or `false` (disabled).
 * ```js
 * {
 *  'SEND_MESSAGES': true,
 *  'EMBED_LINKS': null,
 *  'ATTACH_FILES': false,
 * }
 * ```
 */
export type PermissionOverwriteOptions = Partial<Record<PermissionString, boolean | null>>;

/**
 * Data that can be resolved to give a permission number.
 */
export type PermissionResolvable = BitFieldResolvable<PermissionString, bigint>;

export type PermissionOverwriteResolvable = UserResolvable | RoleResolvable | PermissionOverwrites;

export type PermissionString =
  | 'CREATE_INSTANT_INVITE'
  | 'KICK_MEMBERS'
  | 'BAN_MEMBERS'
  | 'ADMINISTRATOR'
  | 'MANAGE_CHANNELS'
  | 'MANAGE_GUILD'
  | 'ADD_REACTIONS'
  | 'VIEW_AUDIT_LOG'
  | 'PRIORITY_SPEAKER'
  | 'STREAM'
  | 'VIEW_CHANNEL'
  | 'SEND_MESSAGES'
  | 'SEND_TTS_MESSAGES'
  | 'MANAGE_MESSAGES'
  | 'EMBED_LINKS'
  | 'ATTACH_FILES'
  | 'READ_MESSAGE_HISTORY'
  | 'MENTION_EVERYONE'
  | 'USE_EXTERNAL_EMOJIS'
  | 'VIEW_GUILD_INSIGHTS'
  | 'CONNECT'
  | 'SPEAK'
  | 'MUTE_MEMBERS'
  | 'DEAFEN_MEMBERS'
  | 'MOVE_MEMBERS'
  | 'USE_VAD'
  | 'CHANGE_NICKNAME'
  | 'MANAGE_NICKNAMES'
  | 'MANAGE_ROLES'
  | 'MANAGE_WEBHOOKS'
  | 'MANAGE_EMOJIS_AND_STICKERS'
  | 'USE_APPLICATION_COMMANDS'
  | 'REQUEST_TO_SPEAK'
  | 'MANAGE_THREADS'
  | 'USE_PUBLIC_THREADS'
  | 'CREATE_PUBLIC_THREADS'
  | 'USE_PRIVATE_THREADS'
  | 'CREATE_PRIVATE_THREADS'
  | 'USE_EXTERNAL_STICKERS'
  | 'SEND_MESSAGES_IN_THREADS'
  | 'START_EMBEDDED_ACTIVITIES'
  | 'MODERATE_MEMBERS'
  | 'MANAGE_EVENTS';

export type RecursiveArray<T> = ReadonlyArray<T | RecursiveArray<T>>;

export type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;

/**
 * Recipient data received in a {@link PartialGroupDMChannel}.
 */
export interface PartialRecipient {
  /**
   * The username of the recipient
   */
  username: string;
}

/**
 * The premium tier (Server Boost level) of a guild
 * @see {@link [Premium Tier](https://discord.com/developers/docs/resources/guild#guild-object-premium-tier)}
 */
export type PremiumTier = keyof typeof PremiumTiers;

export interface PresenceData {
  status?: PresenceStatusData;
  afk?: boolean;
  activities?: ActivitiesOptions[];
  shardId?: number | number[];
}

export type PresenceResolvable = Presence | UserResolvable | Snowflake;

export interface PartialChannelData {
  id?: Snowflake | number;
  parentId?: Snowflake | number;
  type?: ExcludeEnum<
    typeof ChannelTypes,
    | 'DM'
    | 'GROUP_DM'
    | 'GUILD_NEWS'
    | 'GUILD_STORE'
    | 'UNKNOWN'
    | 'GUILD_NEWS_THREAD'
    | 'GUILD_PUBLIC_THREAD'
    | 'GUILD_PRIVATE_THREAD'
    | 'GUILD_STAGE_VOICE'
  >;
  name: string;
  topic?: string;
  nsfw?: boolean;
  bitrate?: number;
  userLimit?: number;
  rtcRegion?: string | null;
  permissionOverwrites?: PartialOverwriteData[];
  rateLimitPerUser?: number;
}

export type Partialize<
  T extends AllowedPartial,
  N extends keyof T | null = null,
  M extends keyof T | null = null,
  E extends keyof T | '' = '',
> = {
  readonly client: Client;
  id: Snowflake;
  partial: true;
} & {
  [K in keyof Omit<T, 'client' | 'id' | 'partial' | E>]: K extends N ? null : K extends M ? T[K] | null : T[K];
};

export interface PartialDMChannel extends Partialize<DMChannel, null, null, 'lastMessageId'> {
  lastMessageId: undefined;
}

export interface PartialGuildMember extends Partialize<GuildMember, 'joinedAt' | 'joinedTimestamp'> {}

export interface PartialMessage
  extends Partialize<Message, 'type' | 'system' | 'pinned' | 'tts', 'content' | 'cleanContent' | 'author'> {}

export interface PartialMessageReaction extends Partialize<MessageReaction, 'count'> {}

export interface PartialOverwriteData {
  id: Snowflake | number;
  type?: OverwriteType;
  allow?: PermissionResolvable;
  deny?: PermissionResolvable;
}

export interface PartialRoleData extends RoleData {
  id?: Snowflake | number;
}

export type PartialTypes = 'USER' | 'CHANNEL' | 'GUILD_MEMBER' | 'MESSAGE' | 'REACTION' | 'GUILD_SCHEDULED_EVENT';

export interface PartialUser extends Partialize<User, 'username' | 'tag' | 'discriminator'> {}

export type PresenceStatusData = ClientPresenceStatus | 'invisible';

export type PresenceStatus = PresenceStatusData | 'offline';

export type PrivacyLevel = keyof typeof PrivacyLevels;

export interface RateLimitData {
  /**
   * Time until this rate limit ends, in ms
   */
  timeout: number;

  /**
   * The maximum amount of requests of this endpoint
   */
  limit: number;

  /**
   * The HTTP method used for the request
   */
  method: string;

  /**
   * The path of the request relative to the HTTP endpoint
   */
  path: string;

  /**
   * The route of the request relative to the HTTP endpoint
   */
  route: string;

  /**
   * Whether this rate limit is global
   */
  global: boolean;
}

export interface InvalidRequestWarningData {
  /**
   * Number of invalid requests that have been made in the window
   */
  count: number;

  /**
   * Time in ms remaining before the count resets
   */
  remainingTime: number;
}

export interface ReactionCollectorOptions extends CollectorOptions<[MessageReaction, User]> {
  /**
   * The maximum total amount of reactions to collect
   */
  max?: number;

  /**
   * The maximum number of emojis to collect
   */
  maxEmojis?: number;

  /**
   * The maximum number of users to react
   */
  maxUsers?: number;
}

export interface ReplyOptions {
  /**
   * The message to reply to (must be in the same channel and not system)
   */
  messageReference: MessageResolvable;

  /**
   * Whether to error if the referenced message does not exist (creates a standard message in this case when false)
   */
  failIfNotExists?: boolean;
}

/**
 * Options provided when sending a message as an inline reply.
 */
export interface ReplyMessageOptions extends Omit<MessageOptions, 'reply'> {
  /**
   * Whether to error if the referenced message does not exist (creates a standard message in this case when false)
   */
  failIfNotExists?: boolean;
}

export interface ResolvedOverwriteOptions {
  /**
   * The allowed permissions
   */
  allow: Permissions;

  /**
   * The denied permissions
   */
  deny: Permissions;
}

/**
 * The data for a role.
 */
export interface RoleData {
  /**
   * The name of the role
   */
  name?: string;

  /**
   * The color of the role, either a hex string or a base 10 number
   */
  color?: ColorResolvable;

  /**
   * Whether or not the role should be hoisted
   */
  hoist?: boolean;

  /**
   * The position of the role
   */
  position?: number;

  /**
   * The permissions of the role
   */
  permissions?: PermissionResolvable;

  /**
   * Whether or not the role should be mentionable
   */
  mentionable?: boolean;

  /**
   * The icon for the role <warn>The `EmojiResolvable` should belong to the same guild as the role.
   * If not, pass the emoji's URL directly</warn>
   */
  icon?: BufferResolvable | Base64Resolvable | EmojiResolvable | null;

  /**
   * The unicode emoji for the role
   */
  unicodeEmoji?: string | null;
}

export type RoleMention = '@everyone' | `<@&${Snowflake}>`;

/**
 * The data needed for updating a guild role's position
 */
export interface RolePosition {
  /**
   * The role's id
   */
  role: RoleResolvable;

  /**
   * The position to update
   */
  position: number;
}

/**
 * Data that can be resolved to a Role object.
 */
export type RoleResolvable = Role | Snowflake;

export interface RoleTagData {
  /**
   * The id of the bot the role belongs to
   */
  botId?: Snowflake;

  /**
   * The id of the integration the role belongs to
   */
  integrationId?: Snowflake;

  /**
   * Whether the role is the guild's premium subscription role
   */
  premiumSubscriberRole?: true;
}

/**
 * Options used to set the position of a channel.
 */
export interface SetChannelPositionOptions {
  /**
   * Whether or not to change the position relative to its current value
   */
  relative?: boolean;

  /**
   * The reason for changing the position
   */
  reason?: string;
}

/**
 * Options used to set the parent of a channel.
 */
export interface SetParentOptions {
  /**
   * Whether to lock the permissions to what the parent's permissions are
   */
  lockPermissions?: boolean;

  /**
   * The reason for modifying the parent of the channel
   */
  reason?: string;
}

/**
 * Options used to set the position of a role.
 */
export interface SetRolePositionOptions {
  /**
   * Whether to change the position relative to its current value or not
   */
  relative?: boolean;

  /**
   * The reason for changing the position
   */
  reason?: string;
}

/**
 * The mode to spawn shards with for a {@link ShardingManager}. Can be either one of:
 * * 'process' to use child processes
 * * 'worker' to use [Worker threads](https://nodejs.org/api/worker_threads.html)
 */
export type ShardingManagerMode = 'process' | 'worker';

/**
 * The options to spawn shards with for a {@link ShardingManager}.
 */
export interface ShardingManagerOptions {
  /**
   * Number of total shards of all shard managers or "auto"
   */
  totalShards?: number | 'auto';

  /**
   * List of shards to spawn or "auto"
   */
  shardList?: number[] | 'auto';

  /**
   * Which mode to use for shards
   */
  mode?: ShardingManagerMode;

  /**
   * Whether shards should automatically respawn upon exiting
   */
  respawn?: boolean;

  /**
   * Arguments to pass to the shard script when spawning (only available when mode is set to 'process')
   */
  shardArgs?: string[];

  /**
   * Token to use for automatic shard count and passing to shards
   */
  token?: string;

  /**
   * Arguments to pass to the shard script executable when spawning (only available when mode is set to 'process')
   */
  execArgv?: string[];
}

export { Snowflake };

/**
 * Options for splitting a message.
 */
export interface SplitOptions {
  /**
   * Maximum character length per message piece
   */
  maxLength?: number;

  /**
   * Character(s) or Regex(es) to split the message with, an array can be used to split multiple times
   */
  char?: string | string[] | RegExp | RegExp[];

  /**
   * Text to prepend to every piece except the first
   */
  prepend?: string;

  /**
   * Text to append to every piece except the last
   */
  append?: string;
}

/**
 * Options for static Image URLs.
 */
export interface StaticImageURLOptions {
  /**
   * One of `webp`, `png`, `jpg`, `jpeg`.
   */
  format?: AllowedImageFormat;

  /**
   * One of `16`, `32`, `56`, `64`, `96`, `128`, `256`, `300`, `512`, `600`, `1024`, `2048`, `4096`
   */
  size?: AllowedImageSize;
}

export type StageInstanceResolvable = StageInstance | Snowflake;

/**
 * Options for starting a thread on a message.
 */
export interface StartThreadOptions {
  /**
   * The name of the new thread
   */
  name: string;

  /**
   * The amount of time (in minutes) after which the thread should automatically archive in case of no recent activity
   */
  autoArchiveDuration?: ThreadAutoArchiveDuration;

  /**
   * Reason for creating the thread
   */
  reason?: string;

  /**
   * The rate limit per user (slowmode) for the thread in seconds
   */
  rateLimitPerUser?: number;
}

/**
 * The current status of the client. Here are the available statuses:
 * * READY: 0
 * * CONNECTING: 1
 * * RECONNECTING: 2
 * * IDLE: 3
 * * NEARLY: 4
 * * DISCONNECTED: 5
 * * WAITING_FOR_GUILDS: 6
 * * IDENTIFYING: 7
 * * RESUMING: 8
 */
export type Status = number;

/**
 * The value set for a sticker's format type
 * @see {@link [Sticker Format Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-format-types)}
 */
export type StickerFormatType = keyof typeof StickerFormatTypes;

/**
 * Data that resolves to give a Sticker object.
 */
export type StickerResolvable = Sticker | Snowflake;

/**
 * The value set for a sticker's type
 * @see {@link [Sticker Types](https://discord.com/developers/docs/resources/sticker#sticker-object-sticker-types)}
 */
export type StickerType = keyof typeof StickerTypes;

export type SystemChannelFlagsString =
  | 'SUPPRESS_JOIN_NOTIFICATIONS'
  | 'SUPPRESS_PREMIUM_SUBSCRIPTIONS'
  | 'SUPPRESS_GUILD_REMINDER_NOTIFICATIONS'
  | 'SUPPRESS_JOIN_NOTIFICATION_REPLIES';

/**
 * Data that can be resolved to give a system channel flag bitfield.
 */
export type SystemChannelFlagsResolvable = BitFieldResolvable<SystemChannelFlagsString, number>;

/**
 * The types of messages that are `System`.
 */
export type SystemMessageType = Exclude<
  MessageType,
  'DEFAULT' | 'REPLY' | 'APPLICATION_COMMAND' | 'CONTEXT_MENU_COMMAND'
>;

/**
 * Data that can be resolved to a Stage Channel object.
 */
export type StageChannelResolvable = StageChannel | Snowflake;

/**
 * Options used to edit an existing stage instance.
 */
export interface StageInstanceEditOptions {
  /**
   * The new topic of the stage instance
   */
  topic?: string;

  /**
   * The new privacy level of the stage instance
   */
  privacyLevel?: PrivacyLevel | number;
}

export type SweeperKey = keyof SweeperDefinitions;

export type CollectionSweepFilter<K, V> = (value: V, key: K, collection: Collection<K, V>) => boolean;

/**
 * @param collection The collection being swept
 * @returns Return `null` to skip sweeping, otherwise a function passed to `sweep()`, See {@link Collection.sweep} for the
 * definition of this function.
 */
export type SweepFilter<K, V> = (
  collection: LimitedCollection<K, V>,
) => ((value: V, key: K, collection: LimitedCollection<K, V>) => boolean) | null;

/**
 * Options for sweeping a single type of item from cache
 */
export interface SweepOptions<K, V> {
  /**
   * The interval (in seconds) at which to perform sweeping of the item
   */
  interval: number;

  /**
   * The function used to determine the function passed to the sweep method
   * <info>This property is optional when the key is `invites`, `messages`, or `threads` and `lifetime` is set</info>
   */
  filter: GlobalSweepFilter<K, V>;
}

/**
 * Options for sweeping a single type of item from cache
 */
export interface LifetimeSweepOptions {
  /**
   * The interval (in seconds) at which to perform sweeping of the item
   */
  interval: number;

  /**
   * How long an item should stay in cache until it is considered sweepable.
   * <warn>This property is only valid for the `invites`, `messages`, and `threads` keys. The `filter` property
   * is mutually exclusive to this property and takes priority</warn>
   */
  lifetime: number;

  /**
   * The function used to determine the function passed to the sweep method
   * <info>This property is optional when the key is `invites`, `messages`, or `threads` and `lifetime` is set</info>
   */
  filter?: never;
}

export interface SweeperDefinitions {
  applicationCommands: [Snowflake, ApplicationCommand];
  bans: [Snowflake, GuildBan];
  emojis: [Snowflake, GuildEmoji];
  invites: [string, Invite, true];
  guildMembers: [Snowflake, GuildMember];
  messages: [Snowflake, Message, true];
  presences: [Snowflake, Presence];
  reactions: [string | Snowflake, MessageReaction];
  stageInstances: [Snowflake, StageInstance];
  stickers: [Snowflake, Sticker];
  threadMembers: [Snowflake, ThreadMember];
  threads: [Snowflake, ThreadChannel, true];
  users: [Snowflake, User];
  voiceStates: [Snowflake, VoiceState];
}

/**
 * Options for {@link Sweepers} defining the behavior of cache sweeping
 */
export type SweeperOptions = {
  [K in keyof SweeperDefinitions]?: SweeperDefinitions[K][2] extends true
    ? SweepOptions<SweeperDefinitions[K][0], SweeperDefinitions[K][1]> | LifetimeSweepOptions
    : SweepOptions<SweeperDefinitions[K][0], SweeperDefinitions[K][1]>;
};

/**
 * Options for defining the behavior of a LimitedCollection
 */
export interface LimitedCollectionOptions<K, V> {
  /**
   * The maximum size of the Collection
   */
  maxSize?: number;

  /**
   * A function, which is passed the value and key of an entry, ran to decide to keep an entry past the maximum size
   */
  keepOverLimit?: (value: V, key: K, collection: LimitedCollection<K, V>) => boolean;

  /**
   * A function ran every `sweepInterval` to determine how to sweep
   * @deprecated Use Global Sweepers instead
   */
  sweepFilter?: SweepFilter<K, V>;

  /**
   * How frequently, in seconds, to sweep the collection.
   * @deprecated Use Global Sweepers instead
   */
  sweepInterval?: number;
}

export type AnyChannel =
  | CategoryChannel
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | StageChannel
  | StoreChannel
  | TextChannel
  | ThreadChannel
  | VoiceChannel;

/**
 * The channels that are text-based.
 */
export type TextBasedChannel = Extract<AnyChannel, { messages: MessageManager }>;

/**
 * The types of channels that are text-based.
 */
export type TextBasedChannelTypes = TextBasedChannel['type'];

export type VoiceBasedChannel = Extract<AnyChannel, { bitrate: number }>;

export type GuildBasedChannel = Extract<AnyChannel, { guild: Guild }>;

export type NonThreadGuildBasedChannel = Exclude<GuildBasedChannel, ThreadChannel>;

export type GuildTextBasedChannel = Extract<GuildBasedChannel, TextBasedChannel>;

/**
 * Data that can be resolved to a Text Channel object.
 */
export type TextChannelResolvable = Snowflake | TextChannel;

/**
 * A number that is allowed to be the duration (in minutes) of inactivity after which a thread is automatically
 * archived. This can be:
 * * `60` (1 hour)
 * * `1440` (1 day)
 * * `4320` (3 days) <warn>This is only available when the guild has the `THREE_DAY_THREAD_ARCHIVE` feature.</warn>
 * * `10080` (7 days) <warn>This is only available when the guild has the `SEVEN_DAY_THREAD_ARCHIVE` feature.</warn>
 * * `'MAX'` Based on the guild's features
 */
export type ThreadAutoArchiveDuration = 60 | 1440 | 4320 | 10080 | 'MAX';

/**
 * Data that can be resolved to a Thread Channel object.
 */
export type ThreadChannelResolvable = ThreadChannel | Snowflake;

/**
 * The types of channels that are threads.
 */
export type ThreadChannelTypes = 'GUILD_NEWS_THREAD' | 'GUILD_PUBLIC_THREAD' | 'GUILD_PRIVATE_THREAD';

/**
 * Options for creating a thread. <warn>Only one of `startMessage` or `type` can be defined.</warn>
 */
export interface ThreadCreateOptions<AllowedThreadType> extends StartThreadOptions {
  /**
   * The message to start a thread from. <warn>If this is defined then type of thread gets automatically defined and cannot be
   * changed. The provided `type` field will be ignored</warn>
   */
  startMessage?: MessageResolvable;

  /**
   * The type of thread to create. Defaults to `GUILD_PUBLIC_THREAD` if created in a {@link TextChannel} <warn>When creating
   * threads in a {@link NewsChannel} this is ignored and is always `GUILD_NEWS_THREAD`</warn>
   */
  type?: AllowedThreadType;

  /**
   * Whether non-moderators can add other non-moderators to the thread <info>Can only be set when type will be
   * `GUILD_PRIVATE_THREAD`</info>
   */
  invitable?: AllowedThreadType extends 'GUILD_PRIVATE_THREAD' | 12 ? boolean : never;

  /**
   * The rate limit per user (slowmode) for the new channel in seconds
   */
  rateLimitPerUser?: number;
}

/**
 * The options used to edit a thread channel
 */
export interface ThreadEditData {
  /**
   * The new name for the thread
   */
  name?: string;

  /**
   * Whether the thread is archived
   */
  archived?: boolean;

  /**
   * The amount of time (in minutes) after which the thread should automatically archive in case of no recent activity
   */
  autoArchiveDuration?: ThreadAutoArchiveDuration;

  /**
   * The rate limit per user (slowmode) for the thread in seconds
   */
  rateLimitPerUser?: number;

  /**
   * Whether the thread is locked
   */
  locked?: boolean;

  /**
   * Whether non-moderators can add other non-moderators to a thread <info>Can only be edited on `GUILD_PRIVATE_THREAD`</info>
   */
  invitable?: boolean;
}

export type ThreadMemberFlagsString = '';

/**
 * Data that resolves to give a ThreadMember object.
 */
export type ThreadMemberResolvable = ThreadMember | UserResolvable;

export type UserFlagsString =
  | 'DISCORD_EMPLOYEE'
  | 'PARTNERED_SERVER_OWNER'
  | 'HYPESQUAD_EVENTS'
  | 'BUGHUNTER_LEVEL_1'
  | 'HOUSE_BRAVERY'
  | 'HOUSE_BRILLIANCE'
  | 'HOUSE_BALANCE'
  | 'EARLY_SUPPORTER'
  | 'TEAM_USER'
  | 'BUGHUNTER_LEVEL_2'
  | 'VERIFIED_BOT'
  | 'EARLY_VERIFIED_BOT_DEVELOPER'
  | 'DISCORD_CERTIFIED_MODERATOR'
  | 'BOT_HTTP_INTERACTIONS';

export type UserMention = `<@${Snowflake}>`;

/**
 * Data that resolves to give a User object.
 */
export type UserResolvable = User | Snowflake | Message | GuildMember | ThreadMember;

/**
 * An object containing information about a guild's vanity invite.
 */
export interface Vanity {
  /**
   * Vanity invite code
   */
  code: string | null;

  /**
   * How many times this invite has been used
   */
  uses: number;
}

/**
 * The value set for the verification levels for a guild
 * @see {@link [Verification Level](https://discord.com/developers/docs/resources/guild#guild-object-verification-level)}
 */
export type VerificationLevel = keyof typeof VerificationLevels;

/**
 * The types of channels that are voice-based.
 */
export type VoiceBasedChannelTypes = VoiceBasedChannel['type'];

/**
 * Data that can be resolved to a Voice Channel object.
 */
export type VoiceChannelResolvable = Snowflake | VoiceChannel;

/**
 * The data for the webhook client containing either an id and token or just a URL
 */
export type WebhookClientData = WebhookClientDataIdWithToken | WebhookClientDataURL;

export interface WebhookClientDataIdWithToken {
  /**
   * The id of the webhook
   */
  id: Snowflake;

  /**
   * The token of the webhook
   */
  token: string;
}

export interface WebhookClientDataURL {
  /**
   * The full URL for the webhook client
   */
  url: string;
}

export type WebhookClientOptions = Pick<
  ClientOptions,
  'allowedMentions' | 'restTimeOffset' | 'restRequestTimeout' | 'retryLimit' | 'http'
>;

/**
 * Options used to edit a {@link Webhook}.
 */
export interface WebhookEditData {
  /**
   * The new name for the webhook
   */
  name?: string;

  /**
   * The new avatar for the webhook
   */
  avatar?: BufferResolvable | null;

  /**
   * The new channel for the webhook
   */
  channel?: GuildTextChannelResolvable;
}

/**
 * Options that can be passed into editMessage.
 */
export type WebhookEditMessageOptions = Pick<
  WebhookMessageOptions,
  'content' | 'embeds' | 'files' | 'allowedMentions' | 'components' | 'attachments' | 'threadId'
>;

/**
 * Options that can be passed into fetchMessage.
 */
export interface WebhookFetchMessageOptions {
  /**
   * Whether to cache the message.
   */
  cache?: boolean;

  /**
   * The id of the thread this message belongs to. <info>For interaction webhooks, this property is ignored</info>
   */
  threadId?: Snowflake;
}

/**
 * Options that can be passed into send.
 */
export interface WebhookMessageOptions extends Omit<MessageOptions, 'reply' | 'stickers'> {
  /**
   * Username override for the message
   */
  username?: string;

  /**
   * Avatar URL override for the message
   */
  avatarURL?: string;

  /**
   * The id of the thread in the channel to send to. <info>For interaction webhooks, this property is ignored</info>
   */
  threadId?: Snowflake;
}

/**
 * The value set for a webhook's type
 * @see {@link [Webhook Types](https://discord.com/developers/docs/resources/webhook#webhook-object-webhook-types)}
 */
export type WebhookType = keyof typeof WebhookTypes;

export interface WebSocketOptions {
  large_threshold?: number;
  compress?: boolean;
  properties?: WebSocketProperties;
}

export interface WebSocketProperties {
  $os?: string;
  $browser?: string;
  $device?: string;
}

/**
 * Activity sent in a {@link WidgetMember}.
 */
export interface WidgetActivity {
  /**
   * The name of the activity
   */
  name: string;
}

/**
 * Represents a channel in a Widget
 */
export interface WidgetChannel {
  /**
   * Id of the channel
   */
  id: Snowflake;

  /**
   * Name of the channel
   */
  name: string;

  /**
   * Position of the channel
   */
  position: number;
}

/**
 * Welcome channel data
 */
export interface WelcomeChannelData {
  /**
   * The description to show for this welcome channel
   */
  description: string;

  /**
   * The channel to link for this welcome channel
   */
  channel: TextChannel | NewsChannel | StoreChannel | Snowflake;

  /**
   * The emoji to display for this welcome channel
   */
  emoji?: EmojiIdentifierResolvable;
}

/**
 * Welcome screen edit data
 */
export interface WelcomeScreenEditData {
  /**
   * Whether the welcome screen is enabled
   */
  enabled?: boolean;

  /**
   * The description for the welcome screen
   */
  description?: string;

  /**
   * The welcome channel data for the welcome screen
   */
  welcomeChannels?: WelcomeChannelData[];
}

/**
 * The type of a WebSocket message event, e.g. `MESSAGE_CREATE`.
 * @see {@link [Gateway Events](https://discord.com/developers/docs/topics/gateway#commands-and-events-gateway-events)}
 */
export type WSEventType =
  | 'READY'
  | 'RESUMED'
  | 'APPLICATION_COMMAND_CREATE'
  | 'APPLICATION_COMMAND_DELETE'
  | 'APPLICATION_COMMAND_UPDATE'
  | 'GUILD_CREATE'
  | 'GUILD_DELETE'
  | 'GUILD_UPDATE'
  | 'INVITE_CREATE'
  | 'INVITE_DELETE'
  | 'GUILD_MEMBER_ADD'
  | 'GUILD_MEMBER_REMOVE'
  | 'GUILD_MEMBER_UPDATE'
  | 'GUILD_MEMBERS_CHUNK'
  | 'GUILD_ROLE_CREATE'
  | 'GUILD_ROLE_DELETE'
  | 'GUILD_ROLE_UPDATE'
  | 'GUILD_BAN_ADD'
  | 'GUILD_BAN_REMOVE'
  | 'GUILD_EMOJIS_UPDATE'
  | 'GUILD_INTEGRATIONS_UPDATE'
  | 'CHANNEL_CREATE'
  | 'CHANNEL_DELETE'
  | 'CHANNEL_UPDATE'
  | 'CHANNEL_PINS_UPDATE'
  | 'MESSAGE_CREATE'
  | 'MESSAGE_DELETE'
  | 'MESSAGE_UPDATE'
  | 'MESSAGE_DELETE_BULK'
  | 'MESSAGE_REACTION_ADD'
  | 'MESSAGE_REACTION_REMOVE'
  | 'MESSAGE_REACTION_REMOVE_ALL'
  | 'MESSAGE_REACTION_REMOVE_EMOJI'
  | 'THREAD_CREATE'
  | 'THREAD_UPDATE'
  | 'THREAD_DELETE'
  | 'THREAD_LIST_SYNC'
  | 'THREAD_MEMBER_UPDATE'
  | 'THREAD_MEMBERS_UPDATE'
  | 'USER_UPDATE'
  | 'PRESENCE_UPDATE'
  | 'TYPING_START'
  | 'VOICE_STATE_UPDATE'
  | 'VOICE_SERVER_UPDATE'
  | 'WEBHOOKS_UPDATE'
  | 'INTERACTION_CREATE'
  | 'STAGE_INSTANCE_CREATE'
  | 'STAGE_INSTANCE_UPDATE'
  | 'STAGE_INSTANCE_DELETE'
  | 'GUILD_STICKERS_UPDATE';

export type Serialized<T> = T extends symbol | bigint | (() => any)
  ? never
  : T extends number | string | boolean | undefined
  ? T
  : T extends { toJSON(): infer R }
  ? R
  : T extends ReadonlyArray<infer V>
  ? Serialized<V>[]
  : T extends ReadonlyMap<unknown, unknown> | ReadonlySet<unknown>
  ? {}
  : { [K in keyof T]: Serialized<T[K]> };

//#endregion

//#region Voice

/**
 * @internal Use `DiscordGatewayAdapterLibraryMethods` from `@discordjs/voice` instead.
 */
export interface InternalDiscordGatewayAdapterLibraryMethods {
  onVoiceServerUpdate(data: GatewayVoiceServerUpdateDispatchData): void;
  onVoiceStateUpdate(data: GatewayVoiceStateUpdateDispatchData): void;
  destroy(): void;
}

/**
 * @internal Use `DiscordGatewayAdapterImplementerMethods` from `@discordjs/voice` instead.
 */
export interface InternalDiscordGatewayAdapterImplementerMethods {
  sendPayload(payload: unknown): boolean;
  destroy(): void;
}

/**
 * @internal Use `DiscordGatewayAdapterCreator` from `@discordjs/voice` instead.
 */
export type InternalDiscordGatewayAdapterCreator = (
  methods: InternalDiscordGatewayAdapterLibraryMethods,
) => InternalDiscordGatewayAdapterImplementerMethods;

//#endregion
