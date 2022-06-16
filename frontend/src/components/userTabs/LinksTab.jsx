import React, { useEffect } from 'react'
import AnimateButton from '../extended/AnimateButton';
import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { useTheme } from '@mui/material/styles';

const AdminPrivilegesTab = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const memberFetch = useSelector((state) => state.memberFetch)
    const { memberGet } = memberFetch

    return (
        <Stack direction="column" marginLeft={2} marginTop={2} spacing={2}>
            <Button variant="outlined" href={`/application/groups/members/${memberGet.member_id_}`}>
                {
                    t("see_all_groups")
                }
            </Button>
            <Button variant="outlined" href={`/application/quotas/members/${memberGet.member_id_}`}>
                {
                    t("see_all_quotas")
                }
            </Button>
            <Button variant="outlined" href={`/application/sports/members/${memberGet.member_id_}`}>
                {
                    t("see_all_sports")
                }
            </Button>
            <Button variant="outlined" href={`/application/events/members/${memberGet.member_id_}`}>
                {
                    t("see_all_events")
                }
            </Button>
        </Stack>
    )
}

export default AdminPrivilegesTab