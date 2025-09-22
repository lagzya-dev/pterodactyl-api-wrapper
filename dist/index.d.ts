interface Response$Z {
    object: string;
    attributes: {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        max_connections: number | null;
        created_at: string;
        updated_at: string;
    };
    meta: {
        resource: string;
    };
}

interface Response$Y {
    object: string;
    attributes: {
        id: number;
        server: number;
        host: number;
        database: string;
        username: string;
        remote: string;
        max_connections: number;
        created_at: string;
        updated_at: string;
    };
}

interface Response$X {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            server: number;
            host: number;
            database: string;
            username: string;
            remote: string;
            max_connections: number;
            created_at: string;
            updated_at: string;
            relationships: {
                password: {
                    object: string;
                    attributes: {
                        password: string;
                    };
                };
                host: {
                    object: string;
                    attributes: {
                        id: number;
                        name: string;
                        host: string;
                        port: number;
                        username: string;
                        node: number;
                        created_at: string;
                        updated_at: string;
                    };
                };
            };
        };
    }[];
}

interface Response$W {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            ip: string;
            alias: any;
            port: number;
            notes: any;
            assigned: boolean;
        };
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: object;
        };
    };
}

interface Response$V {
    object: string;
    attributes: {
        id: number;
        uuid: string;
        name: string;
        nest: number;
        author: string;
        description: string;
        docker_image: string;
        config: {
            files: object;
            startup: {
                done: string;
                userInteraction: [];
            };
            stop: string;
            logs: {
                custom: boolean;
                location: string;
            };
            extends: any;
        };
        startup: string;
        script: {
            privileged: boolean;
            install: string;
            entry: string;
            container: string;
            extends: any;
        };
        created_at: string;
        updated_at: string;
    };
}

interface Response$U {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            id: number;
            uuid: string;
            name: string;
            nest: number;
            author: string;
            description: string;
            docker_image: string;
            config: {
                files: {
                    [filename: string]: {
                        parser: string;
                        find: {
                            [key: string]: any;
                        };
                    };
                };
            };
            startup: {
                done: string;
                userInteraction: string[];
            };
            stop: string;
            logs: {
                custom: boolean;
                location: string;
            };
            script: {
                privileged: boolean;
                install: string;
                entry: string;
                container: string;
                extends: any;
            };
            created_at: string;
            updated_at: string;
            relationships: {
                nest: {
                    object: string;
                    attributes: {
                        id: number;
                        uuid: string;
                        author: string;
                        name: string;
                        description: string;
                        created_at: string;
                        updated_at: string;
                    };
                };
                servers: {
                    object: string;
                    data: any[];
                };
            };
        };
    }>;
}

interface Response$T {
    object: string;
    attributes: {
        id: number;
        uuid: string;
        author: string;
        name: string;
        description: string;
        created_at: string;
        updated_at: string;
    };
}

interface Response$S {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            uuid: string;
            author: string;
            name: string;
            description: string;
            created_at: string;
            updated_at: string;
        };
    }[];
    meta: {
        pagination: number;
        count: number;
        per_page: number;
        current_page: number;
        total_pages: number;
        links: object;
    };
}

interface Response$R {
    object: string;
    attributes: {
        id: number;
        external_id: null | string | number;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        suspended: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: null | number[];
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        container: {
            startup_command: string;
            image: string;
            installed: boolean;
            environment: object;
        };
        updated_at: string;
        created_at: string;
    };
}

interface Response$Q {
    object: string;
    attributes: {
        id: number;
        external_id: string;
        uuid: string;
        identifier: string;
        name: string;
        descriptions: string;
        suspendes: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: number[] | null;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        container: {
            startup_command: string;
            image: string;
            installed: boolean;
            environment: [];
        };
        updated_at: string;
        created_at: string;
    };
}

interface Response$P {
    object: string;
    attributes: {
        id: number;
        external_id: string;
        uuid: string;
        identifier: string;
        name: string;
        descriptions: string;
        suspendes: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: number[] | null;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        container: {
            startup_command: string;
            image: string;
            installed: boolean;
            environment: [];
        };
        updated_at: string;
        created_at: string;
    };
}

interface Response$O {
    object: string;
    attributes: {
        id: number;
        external_id: string;
        uuid: string;
        identifier: string;
        name: string;
        descriptions: string;
        suspendes: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: number[] | null;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        container: {
            startup_command: string;
            image: string;
            installed: boolean;
            environment: [];
        };
        updated_at: string;
        created_at: string;
    };
}

interface Response$N {
    object: string;
    attributes: {
        id: number;
        external_id: string;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        suspended: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: null | number[];
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        pack: boolean;
        container: {
            startup_commands: string;
            image: string;
            installed: boolean;
            environment: object;
        };
        updated_at: number;
        created_at: number;
    };
}

interface Response$M {
    object: string;
    attributes: {
        id: number;
        external_id: string;
        uuid: string;
        identifier: string;
        name: string;
        description: string;
        suspended: boolean;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
            threads: null | number[];
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        user: number;
        node: number;
        allocation: number;
        nest: number;
        egg: number;
        pack: boolean;
        container: {
            startup_commands: string;
            image: string;
            installed: boolean;
            environment: object;
        };
        updated_at: number;
        created_at: number;
    };
}

interface Response$L {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            external_id: string;
            uuid: string;
            identifier: string;
            name: string;
            description: string;
            suspended: boolean;
            limits: {
                memory: number;
                swap: number;
                disk: number;
                io: number;
                cpu: number;
                threads: null | number[];
            };
            feature_limits: {
                databases: number;
                allocations: number;
                backups: number;
            };
            user: number;
            node: number;
            allocation: number;
            nest: number;
            egg: number;
            pack: any;
            container: {
                startup_command: string;
                image: string;
                installed: boolean;
                environment: object;
            };
            updated_at: string;
            created_at: string;
            relationship: {
                databases: {
                    object: string;
                    data: {
                        object: string;
                        attributes: {
                            id: number;
                            server: number;
                            host: number;
                            database: string;
                            username: string;
                            remote: string;
                            max_connections: number;
                            created_at: string;
                            updated_at: string;
                        };
                    }[];
                }[];
            };
        };
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: object;
        };
    };
}

interface Response$K {
    object: string;
    attributes: {
        id: number;
        short: string;
        long: string;
        updated_at: string;
        created_at: string;
    };
}

interface Response$J {
    object: string;
    attributes: {
        id: number;
        short: string;
        long: string;
        updates_at: string;
        created_at: string;
    };
    meta: {
        resource: string;
    };
}

interface Response$I {
    object: string;
    attributes: {
        id: number;
        short: string;
        long: string;
        updated_at: string;
        created_at: string;
    };
}

interface Response$H {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            short: string;
            long: string;
            updated_at: string;
            created_at: string;
        };
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: object;
        };
    };
}

interface Response$G {
    object: string;
    attributes: {
        id: number;
        uuid: string;
        public: boolean;
        name: string;
        description: string;
        location_id: number;
        fqdn: string;
        scheme: string;
        behind_proxy: boolean;
        maintenance_mode: boolean;
        memory: number;
        memory_overallocate: number;
        disk: number;
        disk_overallocate: number;
        upload_size: number;
        daemon_listen: number;
        daemon_sftp: number;
        daemon_base: string;
        created_at: string;
        updated_at: string;
        mounts: [];
        allocated_resources: {
            memory: number;
            disk: number;
        };
    };
}

interface Response$F {
    object: string;
    attributes: {
        id: number;
        uuid: string;
        public: boolean;
        name: string;
        description: null | string;
        location_id: number;
        fqdn: string;
        scheme: string;
        behind_proxy: boolean;
        maintenance_mode: boolean;
        memory: number;
        memory_overallocate: number;
        disk: number;
        disk_overallocate: number;
        upload_size: number;
        daemon_listen: number;
        daemon_sftp: number;
        daemon_base: string;
        created_at: string;
        updated_at: string;
        allocated_resources: {
            memory: number;
            disk: number;
        };
    };
    meta: {
        resource: string;
    };
}

interface Response$E {
    debug: boolean;
    uuid: string;
    token_id: string;
    token: string;
    api: {
        host: string;
        ssl: {
            enabled: boolean;
            cert: string;
            key: string;
        };
        upload_limit: string;
    };
    system: {
        data: string;
        sftp: {
            bind_port: number;
        };
    };
    remote: string;
}

interface Response$D {
    object: string;
    attributes: {
        id: number;
        uuid: string;
        public: boolean;
        name: string;
        description: string;
        location_id: number;
        fqdn: string;
        scheme: string;
        behind_proxy: boolean;
        maintenance_mode: boolean;
        memory: number;
        memory_overallocate: number;
        disk: number;
        disk_overallocate: number;
        upload_size: number;
        daemon_listen: number;
        daemon_base: string;
        created_at: string;
        updated_at: string;
    };
}

interface Response$C {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            uuid: string;
            public: boolean;
            name: string;
            description: string;
            location_id: number;
            fqdn: string;
            scheme: string;
            behind_proxy: string;
            maintenance_mode: boolean;
            memory: number;
            memory_overallocate: number;
            disk: number;
            disk_overallocate: number;
            upload_size: number;
            daemon_listen: number;
            daemon_sftp: number;
            daemon_base: string;
            created_at: string;
            updated_at: string;
        };
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: object;
        };
    };
}

interface Response$B {
    object: string;
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: string;
        "2fa": boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$A {
    object: string;
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: string;
        "2fa": boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$z {
    object: string;
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: string;
        "2fa": boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$y {
    object: string;
    attributes: {
        id: number;
        external_id: string | null;
        uuid: string;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
        root_admin: string;
        "2fa": boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$x {
    object: string;
    data: {
        object: string;
        attributes: {
            id: number;
            external_id: string | null;
            uuid: string;
            username: string;
            email: string;
            first_name: string;
            last_name: string;
            language: string;
            root_admin: boolean;
            "2fa": boolean;
            created_at: string;
            updated_at: string;
        };
    }[];
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_page: number;
            links: object;
        };
    };
}

/**
 * The Application class provides an interface for interacting with the
 * Pterodactyl Application API. This class gives full control over the panel,
 * including user, node, location, server, database, nest, and allocation management.
 *
 * @example
 * const app = new Application("YOUR_API_KEY");
 * const users = await app.users.list();
 */
declare class Application {
    private apiKey;
    private panel;
    constructor(apiKey: string);
    /** User Management */
    users: {
        list: () => Promise<Response$x>;
        getDetails: (user_id: string) => Promise<Response$y>;
        getDetailsByExternalId: (external_id: string) => Promise<Response$z>;
        create: (user_details: {
            email: string;
            username: string;
            first_name?: string;
            last_name?: string;
        }) => Promise<Response$A>;
        update: (user_id: string, user_data: any) => Promise<Response$B>;
        delete: (user_id: string) => Promise<any>;
    };
    /** Node Management */
    nodes: {
        list: () => Promise<Response$C>;
        getDetails: (node_id: string) => Promise<Response$D>;
        getConfiguration: (node_id: string) => Promise<Response$E>;
        create: (node_data: any) => Promise<Response$F>;
        update: (node_id: string, node_data: any) => Promise<Response$G>;
        delete: (node_id: string) => Promise<any>;
    };
    /** Location Management */
    locations: {
        list: () => Promise<Response$H>;
        getDetails: (location_id: string) => Promise<Response$I>;
        create: (location_data: {
            short: string;
            long: string;
        }) => Promise<Response$J>;
        update: (location_id: string, location_data: any) => Promise<Response$K>;
        delete: (location_id: string) => Promise<any>;
    };
    /** Server Management */
    servers: {
        list: () => Promise<Response$L>;
        getDetails: (server_id: string) => Promise<Response$M>;
        getDetailsByExternalId: (external_id: string) => Promise<Response$N>;
        updateDetails: (server_id: string, update_data: any) => Promise<Response$O>;
        updateBuild: (server_id: string, build_data: any) => Promise<Response$P>;
        updateStartup: (server_id: string, startup_data: any) => Promise<Response$Q>;
        create: (server_data: any) => Promise<Response$R>;
        suspend: (server_id: string) => Promise<any>;
        unsuspend: (server_id: string) => Promise<any>;
        reinstall: (server_id: string) => Promise<any>;
        delete: (server_id: string) => Promise<any>;
        forceDelete: (server_id: string) => Promise<any>;
    };
    /** Nest & Egg Management */
    nests: {
        listNests: () => Promise<Response$S>;
        getNestDetails: (nest_id: string) => Promise<Response$T>;
        listEggs: (nest_id: string) => Promise<Response$U>;
        getEggDetails: (nest_id: string, egg_id: string) => Promise<Response$V>;
    };
    /** Allocations Management */
    allocations: {
        list: (node_id: string) => Promise<Response$W>;
        create: (node_id: string, ip: string, ports: number[]) => Promise<any>;
        delete: (node_id: string, allocation_id: string) => Promise<any>;
    };
    /** Database Management */
    databases: {
        list: (server_id: string) => Promise<Response$X>;
        getDetails: (server_id: string, database_id: string) => Promise<Response$Y>;
        create: (server_id: string, database_data: any) => Promise<Response$Z>;
        resetPassword: (server_id: string, database_id: string) => Promise<any>;
        delete: (server_id: string, database_id: string) => Promise<any>;
    };
}

interface Response$w {
    object: string;
    attributes: {
        url: string;
    };
}

interface Response$v {
    object: string;
    attributes: {
        name: string;
        mode: string;
        size: number;
        is_file: boolean;
        is_symlink: boolean;
        is_editable: boolean;
        mimetype: string;
        created_at: string;
        modified_at: string;
    };
}

interface Response$u {
    object: string;
    attributes: {
        url: string;
    };
}

interface Response$t {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            name: string;
            mode: string;
            size: number;
            is_file: boolean;
            is_symlink: boolean;
            is_editable: boolean;
            mimetype: string;
            created_at: string;
            modified_at: string;
        };
    }>;
}

interface Response$s {
    object: string;
    attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
    };
}

interface Response$r {
    object: string;
    attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
    };
}

interface Response$q {
    object: "server_subuser";
    attributes: {
        uuid: string;
        username: string;
        email: string;
        image: string;
        "2fa_enabled": boolean;
        created_at: string;
        permissions: string[];
    };
}

interface Response$p {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            uuid: string;
            username: string;
            email: string;
            image: string;
            "2fa_enabled": boolean;
            created_at: string;
            permissions: string[];
        };
    }>;
}

interface Response$o {
    object: string;
    attributes: {
        name: string;
        description: string;
        env_variable: string;
        default_value: string;
        server_value: string;
        is_editable: boolean;
        rules: string;
    };
}

interface Response$n {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            name: string;
            description: string;
            env_variable: string;
            default_value: string;
            server_value: string;
            is_editable: boolean;
            rules: string;
        };
    }>;
    meta: {
        startup_command: string;
        raw_startup_command: string;
    };
}

interface Response$m {
    object: string;
    attributes: {
        id: number;
        sequence_id: number;
        action: string;
        payload: string;
        time_offset: number;
        is_queued: boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$l {
    object: string;
    attributes: {
        id: number;
        sequence_id: number;
        action: string;
        payload: string;
        time_offset: number;
        is_queued: boolean;
        created_at: string;
        updated_at: string;
    };
}

interface Response$k {
    object: string;
    attributes: {
        id: number;
        name: string;
        cron: {
            day_of_week: string;
            day_of_month: string;
            hour: string;
            minute: string;
        };
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string;
        created_at: string;
        updated_at: string;
        relationships: {
            tasks: {
                object: string;
                data: any[];
            };
        };
    };
}

interface Response$j {
    object: string;
    attributes: {
        id: number;
        name: string;
        cron: {
            day_of_week: string;
            day_of_month: string;
            hour: string;
            minute: string;
        };
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string;
        created_at: string;
        updated_at: string;
        relationships: {
            tasks: {
                object: string;
                data: Array<{
                    object: string;
                    attributes: {
                        id: number;
                        sequence_id: number;
                        action: string;
                        payload: string;
                        time_offset: number;
                        is_queued: boolean;
                        created_at: string;
                        updated_at: string;
                    };
                }>;
            };
        };
    };
}

interface Response$i {
    object: string;
    attributes: {
        id: number;
        name: string;
        cron: {
            day_of_week: string;
            day_of_month: string;
            hour: string;
            minute: string;
        };
        is_active: boolean;
        is_processing: boolean;
        last_run_at: string | null;
        next_run_at: string;
        created_at: string;
        updated_at: string;
        relationships: {
            tasks: {
                object: string;
                data: any[];
            };
        };
    };
}

interface Response$h {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            id: number;
            name: string;
            cron: {
                day_of_week: string;
                day_of_month: string;
                hour: string;
                minute: string;
            };
            is_active: boolean;
            is_processing: boolean;
            last_run_at: string | null;
            next_run_at: string;
            created_at: string;
            updated_at: string;
            relationships: {
                tasks: {
                    object: string;
                    data: Array<{
                        object: string;
                        attributes: {
                            id: number;
                            sequence_id: number;
                            action: string;
                            payload: string;
                            time_offset: number;
                            is_queued: boolean;
                            created_at: string;
                            updated_at: string;
                        };
                    }>;
                };
            };
        };
    }>;
}

interface Response$g {
    object: string;
    attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        is_default: boolean;
    };
}

interface Response$f {
    object: string;
    attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        is_default: boolean;
    };
}

interface Response$e {
    object: string;
    attributes: {
        id: number;
        ip: string;
        ip_alias: string | null;
        port: number;
        notes: string | null;
        is_default: boolean;
    };
}

interface Response$d {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            id: number;
            ip: string;
            ip_alias: string | null;
            port: number;
            notes: string | null;
            is_default: boolean;
        };
    }>;
}

interface Response$c {
    object: string;
    attributes: {
        url: string;
    };
}

interface Response$b {
    object: string;
    attributes: {
        uuid: string;
        name: string;
        ignored_files: string[];
        sha256_hash: string | null;
        bytes: number;
        created_at: string;
        completed_at: string | null;
    };
}

interface Response$a {
    object: string;
    attributes: {
        uuid: string;
        name: string;
        ignored_files: string[];
        sha256_hash: string;
        bytes: number;
        created_at: string;
        completed_at: string;
    };
}

interface Response$9 {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            uuid: string;
            name: string;
            ignored_files: string[];
            sha256_hash: string;
            bytes: number;
            created_at: string;
            completed_at: string;
        };
    }>;
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: Record<string, any>;
        };
    };
}

interface Response$8 {
    object: string;
    attributes: {
        server_owner: boolean;
        identifier: string;
        uuid: string;
        name: string;
        node: string;
        sftp_details: {
            ip: string;
            port: number;
        };
        description: string;
        limits: {
            memory: number;
            swap: number;
            disk: number;
            io: number;
            cpu: number;
        };
        feature_limits: {
            databases: number;
            allocations: number;
            backups: number;
        };
        is_suspended: boolean;
        is_installing: boolean;
        relationships: {
            allocations: {
                object: string;
                data: Array<{
                    object: string;
                    attributes: {
                        id: number;
                        ip: string;
                        ip_alias: string | null;
                        port: number;
                        notes: string | null;
                        is_default: boolean;
                    };
                }>;
            };
        };
    };
    meta: {
        is_server_owner: boolean;
        user_permissions: string[];
    };
}

interface Response$7 {
    object: string;
    attributes: {
        current_state: string;
        is_suspended: boolean;
        resources: {
            memory_bytes: number;
            cpu_absolute: number;
            disk_bytes: number;
            network_rx_bytes: number;
            network_tx_bytes: number;
        };
    };
}

interface Response$6 {
    data: {
        token: string;
        socket: string;
    };
}

interface Response$5 {
    object: string;
    attributes: {
        permissions: {
            websocket: {
                description: string;
                keys: {
                    connect: string;
                };
            };
            control: {
                description: string;
                keys: {
                    console: string;
                    start: string;
                    stop: string;
                    restart: string;
                };
            };
            user: {
                description: string;
                keys: {
                    create: string;
                    read: string;
                    update: string;
                    delete: string;
                };
            };
            file: {
                description: string;
                keys: {
                    create: string;
                    read: string;
                    update: string;
                    delete: string;
                    archive: string;
                    sftp: string;
                };
            };
            backup: {
                description: string;
                keys: {
                    create: string;
                    read: string;
                    update: string;
                    delete: string;
                    download: string;
                };
            };
            allocation: {
                description: string;
                keys: {
                    read: string;
                    create: string;
                    update: string;
                    delete: string;
                };
            };
            startup: {
                description: string;
                keys: {
                    read: string;
                    update: string;
                };
            };
            database: {
                description: string;
                keys: {
                    create: string;
                    read: string;
                    update: string;
                    delete: string;
                    view_password: string;
                };
            };
            schedule: {
                description: string;
                keys: {
                    create: string;
                    read: string;
                    update: string;
                    delete: string;
                };
            };
            settings: {
                description: string;
                keys: {
                    rename: string;
                    reinstall: string;
                };
            };
        };
    };
}

interface Response$4 {
    object: string;
    data: Array<{
        object: string;
        attributes: {
            server_owner: boolean;
            identifier: string;
            uuid: string;
            name: string;
            node: string;
            sftp_details: {
                ip: string;
                port: number;
            };
            description: string;
            limits: {
                memory: number;
                swap: number;
                disk: number;
                io: number;
                cpu: number;
            };
            feature_limits: {
                databases: number;
                allocations: number;
                backups: number;
            };
            is_suspended: boolean;
            is_installing: boolean;
            relationships: {
                allocations: {
                    object: string;
                    data: Array<{
                        object: string;
                        attributes: {
                            id: number;
                            ip: string;
                            ip_alias: string | null;
                            port: number;
                            notes: string | null;
                            is_default: boolean;
                        };
                    }>;
                };
            };
        };
    }>;
    meta: {
        pagination: {
            total: number;
            count: number;
            per_page: number;
            current_page: number;
            total_pages: number;
            links: Record<string, any>;
        };
    };
}

interface Response$3 {
    object: string;
    data: {
        object: string;
        attributes: {
            identifier: string;
            description: string;
            allowed_ips: [] | string[];
            last_used_at: string;
            created_at: string;
        };
    }[];
}

interface Response$2 {
    object: string;
    attributes: {
        identifier: string;
        description: string;
        allowed_ips: string[];
        last_used_at: null | string;
        created_at: string;
    };
    meta: {
        secret_token: string;
    };
}

interface Response$1 {
    object: string;
    attributes: {
        tokens: string[];
    };
}

interface Response {
    object: string;
    attributes: {
        id: number;
        admin: boolean;
        username: string;
        email: string;
        first_name: string;
        last_name: string;
        language: string;
    };
}

/**
 * The `Client` class provides an interface for interacting with the Pterodactyl Client API.
 * It supports **account management, server control, file operations, backups, networking, schedules, settings, startup variables, and more**.
 */
declare class Client {
    private apiKey;
    private panel;
    constructor(apiKey: string);
    /** Account Management */
    account: {
        getDetails: () => Promise<Response>;
        enable2FA: (codes: string[]) => Promise<Response$1>;
        disable2FA: (tokens: string[]) => Promise<any>;
        updateEmail: (email: string, password: string) => Promise<any>;
        updatePassword: (current_password: string, new_password: string) => Promise<any>;
        createApiKey: (description: string, allowed_ips: string[]) => Promise<Response$2>;
        deleteApiKey: (key_id: string) => Promise<any>;
        listApiKeys: () => Promise<Response$3>;
    };
    /** Server Management */
    servers: {
        list: () => Promise<Response$4>;
        showPermissions: (server_id: string) => Promise<Response$5>;
        sendCommand: (server_id: string, commandStr: string) => Promise<void>;
        powerAction: (server_id: string, signal: "start" | "stop" | "restart" | "kill") => Promise<void>;
        getConsoleDetails: (server_id: string) => Promise<Response$6>;
        getResources: (server_id: string) => Promise<Response$7>;
        getDetails: (server_id: string) => Promise<Response$8>;
    };
    /** Backup Management */
    backups: {
        list: (server_id: string) => Promise<Response$9>;
        getDetails: (server_id: string, backup_id: string) => Promise<Response$a>;
        create: (server_id: string, backup_data: any) => Promise<Response$b>;
        delete: (server_id: string, backup_id: string) => Promise<any>;
        download: (server_id: string, backup_id: string) => Promise<Response$c>;
    };
    /** Settings */
    settings: {
        renameServer: (server_id: string, new_name: string) => Promise<any>;
        reinstallServer: (server_id: string) => Promise<any>;
    };
    /** Network Management */
    network: {
        listAllocations: (server_id: string) => Promise<Response$d>;
        assignAllocations: (server_id: string, allocation_id: number) => Promise<Response$e>;
        setAllocationNote: (server_id: string, allocation_id: string, note: string) => Promise<Response$f>;
        setPrimaryAllocation: (server_id: string, allocation_id: string) => Promise<Response$g>;
        unassignAllocation: (server_id: string, allocation_id: string) => Promise<any>;
    };
    /** Schedule Management */
    schedules: {
        list: (server_id: string) => Promise<Response$h>;
        createSchedule: (server_id: string, schedule_data: any) => Promise<Response$i>;
        scheduleDetails: (server_id: string, schedule_id: string) => Promise<Response$j>;
        updateSchedule: (server_id: string, schedule_id: string, schedule_data: any) => Promise<Response$k>;
        deleteSchedule: (server_id: string, schedule_id: string) => Promise<void>;
        createTask: (server_id: string, schedule_id: string, task_data: any) => Promise<Response$l>;
        updateTask: (server_id: string, schedule_id: string, task_id: string, task_data: any) => Promise<Response$m>;
        deleteTask: (server_id: string, schedule_id: string, task_id: string) => Promise<void>;
    };
    /** Startup Management */
    startup: {
        listVariables: (server_id: string) => Promise<Response$n>;
        updateVariable: (server_id: string, variable_id: string, value: string) => Promise<Response$o>;
    };
    /** User Management */
    users: {
        listUsers: (server_id: string) => Promise<Response$p>;
        createUser: (server_id: string, user_data: any) => Promise<Response$q>;
        updateUser: (server_id: string, user_id: string, user_data: any) => Promise<Response$r>;
        deleteUser: (server_id: string, user_id: string) => Promise<any>;
        userDetails: (server_id: string, user_id: string) => Promise<Response$s>;
    };
    /** File Management */
    files: {
        list: (server_id: string, directory?: string) => Promise<Response$t>;
        getContent: (server_id: string, file_path: string) => Promise<any>;
        download: (server_id: string, file_path: string) => Promise<Response$u>;
        rename: (server_id: string, from: string, to: string) => Promise<any>;
        copy: (server_id: string, file_path: string) => Promise<any>;
        write: (server_id: string, file_path: string, content: string) => Promise<any>;
        compress: (server_id: string, files: string[]) => Promise<Response$v>;
        decompress: (server_id: string, file_path: string) => Promise<any>;
        delete: (server_id: string, files: string[], root: string) => Promise<any>;
        createFolder: (server_id: string, folder_path: string) => Promise<any>;
        upload: (server_id: string, file_data: FormData) => Promise<Response$w>;
    };
}

/**
 * The Setup class provides a way to configure global settings for the Pterodactyl API Wrapper.
 * The primary use is to set the panel URL, which is then used in all API requests.
 *
 * @example
 * Setup.setPanel("https://panel.example.com");
 * const panelUrl = Setup.getPanel();
 */
declare class Setup {
    private static panelUrl;
    /**
     * Sets the global panel URL.
     * @param url - The URL of the Pterodactyl panel.
     */
    static setPanel(url: string): void;
    /**
     * Gets the globally set panel URL.
     * @returns The panel URL.
     * @throws If the panel URL has not been set.
     */
    static getPanel(): string;
}

type ReconnectStrategy = "fixed" | "exponential" | "exponential-jitter";
type EventType = "open" | "message" | "close" | "error" | "reconnectAttempt" | "reconnectSuccess" | "reconnect" | "ping" | "pong" | "custom";
interface WSConnectionOptions {
    /** Primary WebSocket URL (required) */
    url: string;
    /** Optional fallback URLs if the primary fails */
    fallbackUrls?: string[];
    /** Optional subprotocol(s) to use during the handshake */
    protocols?: string | string[];
    /** Automatically reconnect on connection loss */
    autoReconnect?: boolean;
    /** Reconnect strategy: fixed, exponential, or exponential with jitter */
    reconnectStrategy?: ReconnectStrategy;
    /** Base delay (ms) for reconnect attempts */
    reconnectInterval?: number;
    /** Maximum number of reconnect attempts */
    maxReconnectAttempts?: number;
    /** Maximum delay (ms) allowed for exponential backoff */
    maxReconnectInterval?: number;
    /** Additional random jitter (ms) to add when using jitter strategy */
    jitter?: number;
    /** Connection timeout (ms) for establishing the connection */
    connectionTimeout?: number;
    /** Enable heartbeat (ping/pong) mechanism; set interval in ms */
    heartbeatInterval?: number;
    /** Heartbeat ping message (default "ping") */
    heartbeatMessage?: string;
    /** Expected pong message (default "pong") */
    expectedPongMessage?: string;
    /** How long (ms) to wait for a pong before closing the connection */
    heartbeatTimeout?: number;
    /** If true, queue outgoing messages if the connection is not open */
    queueMessages?: boolean;
    /** Maximum number of messages to queue */
    messageQueueLimit?: number;
    /** Automatically JSON‑stringify outgoing objects and parse incoming JSON strings */
    autoJson?: boolean;
    /** Custom logger callback; if not provided, uses console */
    logger?: (level: "debug" | "info" | "warn" | "error", ...args: any[]) => void;
    /** Outgoing message interceptors (middleware) */
    outgoingMessageInterceptors?: Array<(message: any) => any>;
    /** Incoming message interceptors (middleware) */
    incomingMessageInterceptors?: Array<(message: any) => any>;
    /** Hook called before reconnecting; return false to cancel reconnect */
    onBeforeReconnect?: (attempt: number, lastCloseEvent: CloseEvent) => boolean;
    /** Hook called before sending a message; can modify or cancel the send */
    onBeforeSend?: (message: any) => any;
    /** Hook called after a message is sent */
    onAfterSend?: (message: any) => void;
    /** Standard event callbacks (optional) */
    onOpen?: (event: Event) => void;
    onMessage?: (event: MessageEvent) => void;
    onClose?: (event: CloseEvent) => void;
    onError?: (event: Event) => void;
}
interface WSMetrics {
    messagesSent: number;
    messagesReceived: number;
    lastLatency: number;
    reconnectAttempts: number;
    currentUrl: string;
}
declare class AdvancedWebSocket {
    private socket;
    private currentUrl;
    private fallbackUrls;
    private reconnectAttempts;
    private messageQueue;
    private heartbeatIntervalId;
    private pongTimeoutId;
    private connectionTimeoutId;
    private destroyed;
    private messagesSent;
    private messagesReceived;
    private lastPingTimestamp;
    private lastLatency;
    private eventListeners;
    private options;
    constructor(options: WSConnectionOptions);
    /** Internal logger */
    private log;
    /**
     * Establishes the WebSocket connection.
     * Returns a promise that resolves when connected.
     */
    connect(): Promise<WebSocket>;
    /**
     * Computes the delay (ms) for the next reconnection attempt based on strategy.
     */
    private computeReconnectDelay;
    /**
     * Sends data over the WebSocket.
     * Returns a promise that resolves once the message is sent.
     */
    send(data: any): Promise<void>;
    /** Flush queued messages */
    private flushMessageQueue;
    /** Starts the heartbeat (ping/pong) mechanism */
    private startHeartbeat;
    /** Stops the heartbeat mechanism */
    private stopHeartbeat;
    /** Closes the WebSocket connection gracefully */
    close(code?: number, reason?: string): void;
    /** Returns whether the connection is currently open */
    isConnected(): boolean;
    /** Returns a human‑readable connection state */
    getConnectionState(): string;
    /** Forces a manual reconnect */
    manualReconnect(): Promise<WebSocket>;
    /**
     * Sends a message and waits for a response matching the predicate.
     * Useful for request/response patterns.
     */
    sendAndWaitResponse(message: any, predicate: (msg: any) => boolean, timeout?: number): Promise<any>;
    /** Returns metrics on the current connection */
    getMetrics(): WSMetrics;
    /** Destroys the instance, cleans up timers and listeners */
    destroy(): void;
    /** Adds an event listener for a given event type */
    addEventListener(eventType: EventType, callback: (event: any) => void): void;
    /** Removes an event listener for a given event type */
    removeEventListener(eventType: EventType, callback: (event: any) => void): void;
    /** Dispatches an event to all registered listeners */
    private dispatchEvent;
    /** Updates connection options dynamically (effective on next connection) */
    updateOptions(newOptions: Partial<WSConnectionOptions>): void;
    /** Clears the outgoing message queue */
    clearMessageQueue(): void;
}

declare const _default: {
    Application: typeof Application;
    Client: typeof Client;
    Setup: typeof Setup;
    WebSocket: typeof AdvancedWebSocket;
};

export { _default as default };
